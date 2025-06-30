'use client';

import WakaTimeStats from './WakaTimeStats';

export default function Footer() {
  return (
    <footer className="relative z-20 mt-16">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="container mx-auto py-8 px-6 relative">
        <div className="flex flex-col items-center">
          <div className="mb-6 w-32 h-32 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full"></div>
            <div className="absolute inset-4 border border-amber-300/20 rounded-full"></div>
            <div className="text-3xl text-amber-200 font-bold tracking-widest">剑来</div>
          </div>
          
          <p className="text-gray-300 text-lg mb-2 tracking-wide">
            我叫陈平安，唯有一剑，可开天。
          </p>
          
          <div className="flex space-x-4 text-sm text-gray-400 my-4">
            <span>北俱芦洲</span>
            <span>•</span>
            <span>剑气长城</span>
            <span>•</span>
            <span>书剑堂</span>
          </div>

          <div className="text-gray-500 text-sm mt-4">
            <WakaTimeStats />
          </div>
          
          <p className="text-gray-500 text-sm mt-2">&copy; {new Date().getFullYear()} - 天道崩塌，人间值得。</p>
        </div>
      </div>
    </footer>
  );
} 