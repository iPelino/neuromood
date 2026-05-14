import React from 'react';

const MoodLogger: React.FC = () => {
  return (
    <main className="flex-1 w-full md:ml-64 pt-24 md:pt-12 pb-32 md:pb-12 px-container-padding-mobile md:px-container-padding-desktop flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col gap-stack-lg">
        <div className="text-center space-y-2">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">How are you feeling?</h2>
          <p className="font-body-base text-body-base text-text-muted">Take a moment to check in with yourself.</p>
        </div>

        {/* Glassmorphism Container Card */}
        <div className="bg-background-main rounded-xl p-6 md:p-8 shadow-[0_4px_12px_rgba(39,33,60,0.05)] border border-surface-container-high flex flex-col gap-stack-lg relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-fixed rounded-full blur-3xl opacity-30 pointer-events-none"></div>

          {/* Emoji Grid */}
          <div className="flex flex-col gap-stack-sm relative z-10">
            <label className="font-headline-md text-headline-md text-on-surface">Quick Selection</label>
            <div className="grid grid-cols-5 gap-2 md:gap-4 mt-2">
              <button className="group flex flex-col items-center justify-center aspect-square rounded-[2rem] bg-surface-container-highest hover:bg-border-subtle transition-all duration-300 active:scale-95">
                <span className="material-symbols-outlined text-4xl text-secondary group-hover:scale-110 transition-transform">sentiment_very_dissatisfied</span>
              </button>
              <button className="group flex flex-col items-center justify-center aspect-square rounded-[2rem] bg-surface-container-highest hover:bg-border-subtle transition-all duration-300 active:scale-95">
                <span className="material-symbols-outlined text-4xl text-secondary group-hover:scale-110 transition-transform">sentiment_dissatisfied</span>
              </button>
              <button className="group flex flex-col items-center justify-center aspect-square rounded-[2rem] bg-surface-container-highest hover:bg-surface-variant transition-all duration-300 active:scale-95">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:scale-110 transition-transform">sentiment_neutral</span>
              </button>
              <button className="group flex flex-col items-center justify-center aspect-square rounded-[2rem] bg-primary-container shadow-[0_4px_8px_rgba(236,115,87,0.3)] transition-all duration-300 active:scale-95 border-2 border-primary-container scale-105">
                <span className="material-symbols-outlined text-4xl text-on-primary-container fill">sentiment_satisfied</span>
              </button>
              <button className="group flex flex-col items-center justify-center aspect-square rounded-[2rem] bg-surface-container-highest hover:bg-primary-fixed transition-all duration-300 active:scale-95">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:scale-110 transition-transform">sentiment_very_satisfied</span>
              </button>
            </div>
          </div>

          {/* Intensity Slider */}
          <div className="flex flex-col gap-stack-sm relative z-10 pt-4">
            <div className="flex justify-between items-end">
              <label className="font-headline-md text-headline-md text-on-surface">Intensity</label>
              <span className="font-body-base text-body-base text-primary-container font-medium">Moderate</span>
            </div>
            <div className="relative w-full h-12 flex items-center mt-2 group cursor-pointer">
              <div className="w-full h-4 rounded-full bg-gradient-to-r from-border-subtle via-[#e6a89c] to-primary-container shadow-inner"></div>
              <div className="absolute left-[65%] w-8 h-8 rounded-full bg-background-main border-[3px] border-primary-container shadow-[0_2px_4px_rgba(39,33,60,0.2)] transform -translate-x-1/2 group-hover:scale-110 transition-transform flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-container"></div>
              </div>
            </div>
            <div className="flex justify-between w-full px-1">
              <span className="font-label-sm text-label-sm text-text-muted">Mild</span>
              <span className="font-label-sm text-label-sm text-text-muted">Overwhelming</span>
            </div>
          </div>

          {/* Emotional Notes */}
          <div className="flex flex-col gap-base relative z-10 pt-4">
            <label className="font-headline-md text-headline-md text-on-surface">Journal Notes</label>
            <textarea
              className="w-full p-4 rounded-[1.5rem] border border-border-subtle focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none bg-surface-bright resize-none h-40 font-body-base text-body-base text-on-surface placeholder:text-text-muted transition-all shadow-sm"
              placeholder="What's contributing to this feeling? (Optional)"
            ></textarea>
          </div>

          {/* Action */}
          <div className="pt-6 relative z-10">
            <button className="w-full py-5 rounded-full bg-primary-container hover:bg-[#de6044] text-on-primary-container font-headline-md text-headline-md transition-all active:scale-95 shadow-[0_4px_12px_rgba(236,115,87,0.2)] flex justify-center items-center gap-2">
              <span>Save Entry</span>
              <span className="material-symbols-outlined text-xl">check_circle</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MoodLogger;
