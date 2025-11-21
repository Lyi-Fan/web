
import React from 'react';
import { LeaveData, LeaveDetail } from '../types';

// ------------------------------------------------------------------
// 请将下面的 URL 替换为您提供的图片的真实地址
// PLEASE REPLACE THE URLS BELOW WITH THE ACTUAL IMAGE ADDRESSES YOU PROVIDED
// ------------------------------------------------------------------
const AUDIT_STAMP_URL = "/audit_stamp.png"; 
const PASSED_STAMP_URL = "/passed_stamp.png";
// ------------------------------------------------------------------

interface LeaveInfoCardProps {
  data: LeaveData;
}

export const LeaveInfoCard: React.FC<LeaveInfoCardProps> = ({ data }) => {
  // Map the flat data object to the display array structure
  const details: LeaveDetail[] = [
    { label: '请假类型', value: data.type },
    { label: '请假去向', value: data.destination },
    { label: '详细地址', value: data.address },
    { label: '开始时间', value: data.startTime },
    { label: '结束时间', value: data.endTime },
    { label: '统计时长', value: data.duration },
    { label: '紧急联系人', value: data.contactPerson },
    { label: '紧急联系人电话', value: data.contactPhone },
    { label: '请假理由', value: data.reason },
    { label: '请假状态', value: data.status, isHighlight: true },
    { label: '销假状态', value: data.returnStatus },
    { label: '请假附件', value: data.attachment },
  ];

  // Determine stamp status
  let stampStatus: 'audit' | 'passed' | null = null;
  if (data.status.includes('通过') || data.status === '已通过' || data.status === '审核通过') {
    stampStatus = 'passed';
  } else if (data.status.includes('审核') || data.status.includes('处理中') || data.status === '申请') {
    stampStatus = 'audit';
  }

  return (
    <div className="bg-white p-4 mb-3 relative overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center mb-4 relative z-10">
        <div className="w-1 h-4 bg-[#3478f6] rounded-full mr-2"></div>
        <h2 className="text-base font-bold text-gray-800">请假信息</h2>
      </div>

      {/* Audit Stamp Image */}
      {stampStatus === 'audit' && (
        <img 
          src={AUDIT_STAMP_URL}
          alt="审核中"
          className="absolute top-1 right-4 w-28 opacity-90 transform -rotate-12 z-0 pointer-events-none object-contain"
        />
      )}

      {/* Passed Stamp Image */}
      {stampStatus === 'passed' && (
        <img 
          src={PASSED_STAMP_URL}
          alt="已通过"
          className="absolute top-1 right-4 w-28 opacity-90 transform -rotate-12 z-0 pointer-events-none object-contain"
        />
      )}

      {/* Details List */}
      <div className="space-y-3 relative z-10">
        {details.map((item, index) => (
          <div key={index} className="flex text-[15px]">
            <span className="text-gray-500 flex-shrink-0">
               {item.label}:
            </span>
            <span className={`flex-1 ml-1 ${item.isHighlight ? 'text-[#3478f6]' : 'text-gray-800'} break-words`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
