import React from 'react';
import { MapPin } from 'lucide-react';

export const Breadcrumb: React.FC = () => {
  return (
    <div className="bg-[#eef4fe] px-4 py-3 text-sm text-gray-600 flex items-center gap-1 border-b border-blue-100">
      <MapPin size={14} className="text-[#3478f6]" fill="#3478f6" />
      <span className="text-[#3478f6] font-medium">首页</span>
      <span className="text-gray-400">{'>'}</span>
      <span>请假管理</span>
      <span className="text-gray-400">{'>'}</span>
      <span>请假管理</span>
    </div>
  );
};