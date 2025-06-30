'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md shadow-lg shadow-black/30 border-b border-amber-500/20"></div>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <Link href="/" 
          className="group flex items-center space-x-2"
          onMouseEnter={() => setHoveredItem('home')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="h-12 w-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/30 rounded-full backdrop-blur-sm border border-amber-200/40 shadow-inner shadow-amber-200/20"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">平</div>
          </div>
          <div className="relative">
            <span className="text-2xl font-bold text-white tracking-widest">陈平安</span>
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 ${
              hoveredItem === 'home' ? 'w-full' : 'w-0'
            }`}></span>
          </div>
        </Link>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-8">
          <Link 
            href="/portfolio" 
            className="relative text-lg text-gray-200 hover:text-white transition-colors"
            onMouseEnter={() => setHoveredItem('portfolio')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span>剑谱典籍</span>
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 ${
              hoveredItem === 'portfolio' ? 'w-full' : 'w-0'
            }`}></span>
          </Link>
          
          <Link 
            href="/qanything" 
            className="relative text-lg text-gray-200 hover:text-white transition-colors"
            onMouseEnter={() => setHoveredItem('qanything')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span>剑道论坛</span>
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 ${
              hoveredItem === 'qanything' ? 'w-full' : 'w-0'
            }`}></span>
          </Link>
        </div>

        {/*  空div用于平衡flex布局 */}
        <div></div>
      </nav>
    </header>
  );
} 