
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { LeaveListCard } from './LeaveListCard';
import { LeaveData } from '../types';

interface LeaveListPageProps {
  leaves: LeaveData[];
  onSelectLeave: (data: LeaveData) => void;
  onApply: () => void;
  isManageMode: boolean;
  onDeleteLeave: (id: string) => void;
  onToggleManage: () => void;
}

export const LeaveListPage: React.FC<LeaveListPageProps> = ({ 
  leaves, 
  onSelectLeave, 
  onApply, 
  isManageMode, 
  onDeleteLeave,
  onToggleManage
}) => {
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
    <div className="flex flex-col h-full relative">
      {/* Filter Bar */}
      <div className="bg-[#f3f4f6] px-4 py-3 flex justify-between items-center flex-shrink-0 z-10">
        <h2 className="text-gray-500 font-bold text-base">申请记录</h2>
        
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm text-[#3478f6] text-sm font-medium active:bg-blue-50 transition-colors"
          >
            全部状态
            <ChevronDown size={14} className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-xl py-1 text-gray-800 overflow-hidden z-50 origin-top-right border border-gray-100">
               <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-blue-600 font-medium bg-blue-50/30"
              >
                全部状态
              </button>
              <div className="h-[1px] bg-gray-100 my-1"></div>
              <button
                onClick={() => {
                  onToggleManage();
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${isManageMode ? 'text-red-500' : 'text-gray-700'}`}
              >
                {isManageMode ? '完成' : '管理'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* List - Scrollable Area with side padding */}
      <div className="flex-1 px-3 pt-3 pb-24 overflow-y-auto no-scrollbar">
        {leaves.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-64 text-gray-400">
             <p>暂无申请记录</p>
           </div>
        ) : (
          leaves.map((item) => (
            <LeaveListCard 
              key={item.id} 
              data={item} 
              onClick={() => onSelectLeave(item)} 
              isManageMode={isManageMode}
              onDelete={() => item.id && onDeleteLeave(item.id)}
            />
          ))
        )}
      </div>

      {/* Floating Apply Button - Hide in Manage Mode */}
      {!isManageMode && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
           <button 
             onClick={onApply}
             className="bg-[#00b0ff] text-white text-[17px] font-medium py-3 px-12 rounded-full shadow-lg pointer-events-auto w-48 active:scale-95 transition-transform"
           >
             申 请
           </button>
        </div>
      )}
    </div>
  );
};
