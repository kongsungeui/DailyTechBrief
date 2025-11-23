import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { NewsCard } from './components/NewsCard';
import { SourceBadge } from './components/SourceBadge';
import { LoadingState } from './components/LoadingState';
import { fetchTechNews } from './services/geminiService';
import { NewsItem, GroundingChunk, FetchStatus } from './types';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadNews = async () => {
    setStatus(FetchStatus.LOADING);
    setErrorMsg(null);
    try {
      const data = await fetchTechNews();
      setNews(data.items);
      setSources(data.groundingChunks);
      setStatus(FetchStatus.SUCCESS);
    } catch (error) {
      console.error("Failed to load news:", error);
      setStatus(FetchStatus.ERROR);
      setErrorMsg("뉴스를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-8">
        
        {/* Introduction Area */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Today's Top 5 Tech Stories
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Gemini 2.5가 Google 검색을 통해 수집한 실시간 미국 테크 뉴스입니다. 
            가장 중요한 5가지 이슈를 선정하여 핵심 요약과 인사이트를 제공합니다.
          </p>
        </div>

        {/* Content Area */}
        {status === FetchStatus.LOADING && <LoadingState />}

        {status === FetchStatus.ERROR && (
          <div className="text-center py-20 bg-red-500/5 border border-red-500/20 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-200 mb-6">{errorMsg}</p>
            <button 
              onClick={loadNews}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors font-medium"
            >
              다시 시도
            </button>
          </div>
        )}

        {status === FetchStatus.SUCCESS && (
          <div className="space-y-8">
            
            {/* News Cards */}
            <div className="grid gap-6">
              {news.length > 0 ? (
                news.map((item, index) => (
                  <NewsCard key={item.id} item={item} index={index} />
                ))
              ) : (
                <div className="text-center py-10 text-slate-500">
                   뉴스를 찾지 못했습니다. 다시 시도해주세요.
                </div>
              )}
            </div>

            {/* Sources Section - Required for Grounding Compliance */}
            {sources.length > 0 && (
              <div className="mt-16 pt-8 border-t border-slate-800">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Sources & References
                </h3>
                <div className="flex flex-wrap gap-3">
                  {sources.map((source, idx) => (
                     source.web?.uri ? (
                      <SourceBadge 
                        key={`${source.web.uri}-${idx}`} 
                        uri={source.web.uri} 
                        title={source.web.title || "Source"} 
                      />
                     ) : null
                  ))}
                </div>
                <p className="text-xs text-slate-600 mt-4">
                  * 이 정보는 Google Search Grounding을 통해 실시간으로 수집되었습니다.
                </p>
              </div>
            )}
            
             <div className="flex justify-center pt-10">
              <button 
                onClick={loadNews}
                className="group flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/40"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh News
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default App;