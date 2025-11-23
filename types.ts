export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  analysis: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface TechNewsResponse {
  items: NewsItem[];
  groundingChunks: GroundingChunk[];
  rawText: string;
}

export enum FetchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}