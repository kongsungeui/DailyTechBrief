import React from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
  index: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, index }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 font-bold text-sm border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-colors">
          {index + 1}
        </span>
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold text-slate-100 leading-tight">
            {item.title}
          </h3>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Summary</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {item.summary}
              </p>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Insight
              </h4>
              <p className="text-blue-100/80 text-sm italic">
                {item.analysis}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};