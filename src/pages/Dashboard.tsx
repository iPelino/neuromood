import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <main className="pt-20 md:pt-8 pb-28 md:pb-8 px-container-padding-mobile md:px-container-padding-desktop md:ml-64 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-md gap-4">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-text-primary">Good morning, Alex</h2>
          <p className="text-text-secondary mt-1">Here is your wellness overview for today.</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className="p-3 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <img
            alt="User Profile"
            className="w-12 h-12 rounded-full object-cover border border-border-subtle"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGOGIaDS9pb-X7cJyFFiZ05WgmvV1Z8Y99VRjC8aWJcNttL7nNFslfJulQkoCHB3LWDzBDhKuphiOMsQo_7Na7X3z2-q9E1T-MjeS-kqylREAX1imqnUWOcwHhW7GmNRBdxfpm0m6J0gNUrvWDxWS22IUbMcyzN5xw9phOWPJFz4D4NbFD9CJ-xXvX0x-v0HPp27Vktw2LIAGU7PhzqxJg1a7lSDkL3nlw0dGDPoVZ-8qQzSgx9IjCJIh_UJ_UYsSKEEdcSGDVDVM"
          />
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-stack-md">
        
        {/* Hero Metric Card */}
        <div className="bg-surface rounded-DEFAULT shadow-[0_4px_6px_rgba(39,33,60,0.1)] p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-headline-md text-headline-md text-text-primary">Current Balance</h3>
            <span className="px-3 py-1 bg-surface-container-low text-primary rounded-full font-label-sm text-label-sm font-medium">
              Updated 2h ago
            </span>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <div className="w-20 h-20 bg-secondary-fixed rounded-full flex items-center justify-center">
              <span className="text-4xl">😌</span>
            </div>
            <div>
              <p className="font-headline-lg text-headline-lg text-text-primary">Calm &amp; Focused</p>
              <p className="text-success-growth font-medium flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
                Steady over 3 days
              </p>
            </div>
          </div>
        </div>

        {/* AI Wellness Card */}
        <div className="bg-secondary-fixed rounded-DEFAULT p-6 flex flex-col relative overflow-hidden xl:col-span-1">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-[80px]">auto_awesome</span>
          </div>
          <div className="flex items-center gap-2 mb-4 text-secondary relative z-10">
            <span className="material-symbols-outlined">psychology</span>
            <h3 className="font-headline-md text-headline-md font-medium">AI Insight</h3>
          </div>
          <p className="text-on-secondary-fixed-variant relative z-10 text-[18px] leading-relaxed mb-6">
            We noticed your energy levels dip around 3 PM consistently. Consider scheduling a brief 10-minute mindful walk before your afternoon meetings.
          </p>
          <button className="mt-auto self-start px-6 py-2 bg-surface text-primary rounded-full font-medium shadow-sm hover:shadow-md transition-shadow relative z-10">
            View Details
          </button>
        </div>

        {/* Mood Trend Line Chart */}
        <div className="bg-surface rounded-DEFAULT shadow-[0_4px_6px_rgba(39,33,60,0.1)] p-6 md:col-span-2 xl:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-text-primary">Mood Trend</h3>
            <div className="flex gap-4 font-label-sm text-label-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                <span>Energy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success-growth"></div>
                <span>Calmness</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full relative min-h-[200px] flex items-end pt-4">
            {/* Y Axis Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full border-b border-border-subtle h-0"></div>
              <div className="w-full border-b border-border-subtle h-0"></div>
              <div className="w-full border-b border-border-subtle h-0"></div>
              <div className="w-full border-b border-border-subtle h-0"></div>
            </div>
            {/* Mock SVG Chart */}
            <svg className="w-full h-full overflow-visible preserve-3d" preserveAspectRatio="none" viewBox="0 0 100 40">
              <path className="stroke-success-growth" d="M0,30 Q10,25 20,28 T40,15 T60,20 T80,10 T100,5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <path className="stroke-primary-container" d="M0,20 Q15,10 25,18 T45,25 T65,15 T85,28 T100,20" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
          <div className="flex justify-between w-full mt-4 text-text-muted font-label-sm text-label-sm px-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* History List */}
        <div className="bg-surface rounded-DEFAULT shadow-[0_4px_6px_rgba(39,33,60,0.1)] p-6 md:col-span-2 xl:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-text-primary">Recent History</h3>
            <button className="text-primary font-medium text-sm hover:underline">See All</button>
          </div>
          <div className="flex flex-col">
            <div className="py-4 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-xl">
                  🌟
                </div>
                <div>
                  <p className="font-medium text-text-primary">Motivated</p>
                  <p className="text-sm text-text-secondary">Today, 9:00 AM</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-surface-container-low text-primary-container rounded-full text-sm font-medium">Intensity: 8</div>
            </div>

            <div className="py-4 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-xl">
                  😌
                </div>
                <div>
                  <p className="font-medium text-text-primary">Relaxed</p>
                  <p className="text-sm text-text-secondary">Yesterday, 8:30 PM</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-surface-container-low text-success-growth rounded-full text-sm font-medium">Intensity: 5</div>
            </div>

            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-xl">
                  😮‍💨
                </div>
                <div>
                  <p className="font-medium text-text-primary">Overwhelmed</p>
                  <p className="text-sm text-text-secondary">Yesterday, 2:15 PM</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-surface-container-low text-primary rounded-full text-sm font-medium">Intensity: 7</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Dashboard;
