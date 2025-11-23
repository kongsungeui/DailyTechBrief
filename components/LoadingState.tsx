import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse max-w-4xl mx-auto px-4 mt-8">
      <div className="h-8 bg-slate-800 rounded w-1/3 mx-auto mb-12"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-slate-800/30 border border-slate-800 rounded-xl p-6 h-48">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-700"></div>
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-slate-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-700/50 rounded w-full"></div>
                <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
              </div>
              <div className="h-16 bg-slate-700/30 rounded w-full mt-4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};