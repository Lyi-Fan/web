
import React from 'react';
import { LeaveData } from '../types';
import { Trash2 } from 'lucide-react';

interface LeaveListCardProps {
  data: LeaveData;
  onClick: () => void;
  isManageMode?: boolean;
  onDelete?: () => void;
}

export const LeaveListCard: React.FC<LeaveListCardProps> = ({ data, onClick, isManageMode, onDelete }) => {
  return (
    <div 
      onClick={isManageMode ? undefined : onClick}
      className={`bg-white p-4 mb-3 shadow-sm transition-colors relative rounded-sm ${!isManageMode ? 'active:bg-gray-50 cursor-pointer' : ''}`}
    >
      {/* Delete Button Overlay */}
      {isManageMode && (
        <div className="absolute top-2 right-2 z-20">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete?.();
            }}
            className="bg-red-50 text-red-500 p-2 rounded-full shadow-sm border border-red-100 hover:bg-red-100 active:scale-95 transition-all cursor-pointer pointer-events-auto"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}

      {/* Header: Type and Apply Date */}
      <div className="flex justify-between items-start pb-3 border-b border-gray-100 mb-3">
        <h3 className="text-[17px] font-bold text-gray-800">{data.type}</h3>
        <span className={`text-gray-400 text-xs pt-1 ${isManageMode ? 'opacity-30' : ''}`}>{data.applyTime}</span>
      </div>

      {/* Content Info */}
      <div className={`space-y-2 mb-3 ${isManageMode ? 'opacity-80' : ''}`}>
        <div className="flex text-[14px]">
          <span className="text-gray-400 flex-shrink-0">开始时间:</span>
          <span className="text-gray-400 font-mono">{data.startTime}</span>
        </div>
        <div className="flex text-[14px]">
          <span className="text-gray-400 flex-shrink-0">结束时间:</span>
          <span className="text-gray-400 font-mono">{data.endTime}</span>
        </div>
        <div className="flex text-[14px]">
          <span className="text-gray-400 flex-shrink-0">请假理由:</span>
          <span className="text-gray-400 line-clamp-1">{data.reason}</span>
        </div>
      </div>

      {/* Status */}
      <div className={`text-[#3478f6] text-[15px] ${isManageMode ? 'opacity-80' : ''}`}>
        {data.status}
      </div>
    </div>
  );
};
