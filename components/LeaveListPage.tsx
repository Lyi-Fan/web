
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { LeaveListCard } from './LeaveListCard';
import { LeaveData } from '../types';

interface LeaveListPageProps {
  leaves: LeaveData[];
  onSelectLeave: (data: LeaveData) => void;
  onApply: () => void;
  isManageMode: boolean;
  onDeleteLeave: (id: string) => void;
}

export const LeaveListPage: React.FC<LeaveListPageProps> = ({ 
  leaves, 
  onSelectLeave, 
  onApply, 
  isManageMode, 
  onDeleteLeave 
}) => {
  return (
    <div className="flex flex-col h-full relative">
      {/* Filter Bar */}
      <div className="bg-[#f3f4f6] px-4 py-3 flex justify-between items-center flex-shrink-0 z-10">
        <h2 className="text-gray-500 font-bold text-base">申请记录</h2>
        <button className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm text-[#3478f6] text-sm font-medium">
          全部状态
          <ChevronDown size={14} />
        </button>
      </div>

      {/* List - Scrollable Area */}
      <div className="flex-1 px-0 pb-24 overflow-y-auto no-scrollbar">
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