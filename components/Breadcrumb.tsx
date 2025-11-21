import React from 'react';
import { MapPin } from 'lucide-react';

interface BreadcrumbProps {
  viewMode?: 'LIST' | 'DETAIL' | 'FORM';
  onNavigate?: () => void; // Function to go back to list
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ viewMode = 'LIST', onNavigate }) => {
  const isListPage = viewMode === 'LIST';

  return (
    <div className="bg-[#eef4fe] px-4 py-3 text-sm text-gray-600 flex items-center gap-1 border-b border-blue-100 sticky top-0 z-30">
      <MapPin size={14} className="text-[#3478f6]" fill="#3478f6" />
      <span className="text-[#3478f6] font-medium">首页</span>
      <span className="text-gray-400">{'>'}</span>
      
      {/* First Level: List Page */}
      <span 
        onClick={!isListPage && onNavigate ? onNavigate : undefined}
        className={`${!isListPage ? 'text-[#3478f6] cursor-pointer active:opacity-70' : 'text-gray-600'}`}
      >
        请假管理
      </span>

      {/* Second Level: Detail/Form Page */}
      {!isListPage && (
        <>
          <span className="text-gray-400">{'>'}</span>
          <span className="text-gray-600">请假管理</span>
        </>
      )}
    </div>
  );
};