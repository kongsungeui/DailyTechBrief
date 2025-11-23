import { GoogleGenAI } from "@google/genai";
import { NewsItem, TechNewsResponse, GroundingChunk } from "../types";

const SPLIT_MARKER = "|||ITEM|||";

export const fetchTechNews = async (): Promise<TechNewsResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Prompt engineering:
  // 1. Ask for search grounding (implicit via tools).
  // 2. Ask for a specific delimiter format to parse the plain text response since JSON schema isn't allowed with search tools.
  const prompt = `
    Find the top 5 hottest trending Tech news stories in the United States for today, ${today}.
    
    For each story, provide:
    1. A catchy Title (in Korean).
    2. A concise Summary of the event (in Korean).
    3. A brief Analysis of why this is significant for the industry (in Korean).
    
    IMPORTANT FORMATTING INSTRUCTIONS:
    - Do NOT use Markdown formatting like bolding (**text**) or headers (##) inside the content fields. Keep text plain.
    - Separate each of the 5 news items strictly with the string "${SPLIT_MARKER}".
    - Inside each item, structure it exactly like this:
      Title: [Korean Title]
      Summary: [Korean Summary]
      Analysis: [Korean Analysis]
      
    Ensure you use the Google Search tool to get the most accurate, up-to-date information.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType and responseSchema are NOT supported with googleSearch
      },
    });

    const text = response.text || "";
    const candidates = response.candidates;
    const groundingMetadata = candidates?.[0]?.groundingMetadata;
    const groundingChunks = (groundingMetadata?.groundingChunks as GroundingChunk[]) || [];

    // Parse the text based on the custom marker
    const itemStrings = text.split(SPLIT_MARKER).filter(str => str.trim().length > 0);

    const items: NewsItem[] = itemStrings.map((itemStr, index) => {
      const titleMatch = itemStr.match(/Title:\s*(.+?)(?=\n|Summary:)/s);
      const summaryMatch = itemStr.match(/Summary:\s*(.+?)(?=\n|Analysis:)/s);
      const analysisMatch = itemStr.match(/Analysis:\s*(.+?)(?=$|\n)/s);

      return {
        id: `news-${index}`,
        title: titleMatch ? titleMatch[1].trim() : "뉴스 제목 없음",
        summary: summaryMatch ? summaryMatch[1].trim() : "요약 내용을 불러올 수 없습니다.",
        analysis: analysisMatch ? analysisMatch[1].trim() : "분석 내용을 불러올 수 없습니다.",
      };
    }).slice(0, 5); // Ensure we only take up to 5

    return {
      items,
      groundingChunks,
      rawText: text,
    };

  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};