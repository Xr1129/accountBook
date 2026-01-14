
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between h-screen py-20 bg-background-light">
      <div />
      <div className="flex flex-col items-center space-y-8 animate-pulse">
        <div className="relative flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-cream flex items-center justify-center shadow-sm">
            <div className="w-24 h-24 rounded-full border-[1.5px] border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[64px]">eco</span>
            </div>
          </div>
          <div className="absolute -top-4 -right-2 w-3 h-3 rounded-full bg-primary/20"></div>
          <div className="absolute top-8 -left-6 w-2 h-2 rounded-full bg-cream border border-primary/20"></div>
        </div>
        <div className="text-center">
          <h1 className="text-[36px] font-bold tracking-tight leading-tight mb-2 text-charcoal">Daily Bloom</h1>
          <p className="text-primary/70 text-base">Grow your wealth, naturally.</p>
        </div>
      </div>

      <div className="w-full max-w-[280px] space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-gray-400 text-xs text-center font-medium uppercase tracking-[0.2em]">Preparing your garden</p>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-2/3 rounded-full animate-bounce"></div>
          </div>
        </div>
        <div className="text-center">
          <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Designed for Mindful Finance</span>
        </div>
      </div>
    </div>
  );
};

export default Splash;
