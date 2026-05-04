'use client';

import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

export default function EngineeringContextMenu() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      
      // Ensure it doesn't clip off the right or bottom edges
      const menuWidth = 220;
      const menuHeight = 160;
      let x = e.clientX;
      let y = e.clientY;
      
      if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 10;
      if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 10;
      
      setPosition({ x, y });
      setIsVisible(true);
    };

    const handleClick = () => {
      if (isVisible) setIsVisible(false);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
    };
  }, [isVisible]);

  const handleAction = (action: string) => {
    setIsVisible(false);
    // Future expansion: actually copy things to clipboard or open modals
    console.log("Executed: ", action);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
          className="fixed z-[999999] bg-black/70 backdrop-blur-2xl border border-white/10 rounded-lg shadow-2xl p-2 w-[220px] font-mono text-xs overflow-hidden"
          style={{ top: position.y, left: position.x }}
        >
          {/* Header */}
          <div className="px-3 py-2 text-[9px] uppercase tracking-widest text-[#a3a39c] border-b border-white/5 mb-2">
            GRG_SYS_ACCESS
          </div>
          
          <ul className="flex flex-col gap-1 text-[#f5f0e8]">
            <li>
              <button 
                onClick={() => handleAction('copy-specs')}
                className="w-full text-left px-3 py-2 rounded-[4px] hover:bg-[#c9a84c]/20 hover:text-[#c9a84c] transition-colors flex items-center justify-between group"
              >
                <span>Copy Architecture Specs</span>
                <span className="opacity-0 group-hover:opacity-100 text-[#c9a84c]">{'>'}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleAction('request-audit')}
                className="w-full text-left px-3 py-2 rounded-[4px] hover:bg-[#c9a84c]/20 hover:text-[#c9a84c] transition-colors flex items-center justify-between group"
              >
                <span>Request Tech Audit</span>
                <span className="opacity-0 group-hover:opacity-100 text-[#c9a84c]">{'>'}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleAction('live-prod')}
                className="w-full text-left px-3 py-2 rounded-[4px] hover:bg-[#c9a84c]/20 hover:text-[#c9a84c] transition-colors flex items-center justify-between group"
              >
                <span>Ping Live Production</span>
                <span className="opacity-0 group-hover:opacity-100 text-[#c9a84c]">{'>'}</span>
              </button>
            </li>
          </ul>
        </m.div>
      )}
    </AnimatePresence>
  );
}
