import React from 'react';

interface SourceBadgeProps {
  uri: string;
  title: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ uri, title }) => {
  // Simple domain extraction for cleaner display
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch (e) {
      return 'Source';
    }
  };

  return (
    <a 
      href={uri} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md text-xs text-slate-300 transition-colors duration-200 max-w-full truncate"
      title={title}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></span>
      <span className="truncate max-w-[150px] sm:max-w-[200px]">{title || getDomain(uri)}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-500 flex-shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
};