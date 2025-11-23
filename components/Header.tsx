import React from 'react';

export const Header: React.FC = () => {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Daily US Tech Brief
          </h1>
          <p className="text-slate-400 text-sm mt-1">AI 기반 미국 테크 트렌드 분석</p>
        </div>
        <div className="text-slate-500 text-sm font-medium bg-slate-800 px-3 py-1 rounded-full">
          {today}
        </div>
      </div>
    </header>
  );
};