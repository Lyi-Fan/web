import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreVertical } from 'lucide-react';

interface MenuAction {
  label: string;
  onClick: () => void;
  color?: string;
}

interface HeaderProps {
  onBack?: () => void;
  menuActions?: MenuAction[];
}

export const Header: React.FC<HeaderProps> = ({ onBack, menuActions = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#3478f6] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md h-[56px]">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-1 -ml-2 hover:bg-blue-600 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium tracking-wide">请假管理</h1>
      </div>
      
      <div className="relative" ref={menuRef}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1 -mr-2 hover:bg-blue-600 rounded-full transition-colors"
        >
          <MoreVertical size={24} />
        </button>

        {isMenuOpen && menuActions.length > 0 && (
          <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-xl py-1 text-gray-800 overflow-hidden z-50 origin-top-right">
            {menuActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 text-sm active:bg-gray-100 ${action.color || ''}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};