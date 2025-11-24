
import React from 'react';
import { LeaveData, LeaveDetail } from '../types';

// ------------------------------------------------------------------
// 这里的路径对应项目根目录下 public 文件夹中的图片文件
// Vite 约定：放在 public 目录下的文件，在代码中直接用 "/" + 文件名 访问
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

  // Determine stamp status based on exact keywords
  let stampStatus: 'audit' | 'passed' | null = null;
  const status = data.status || '';

  // 优先级逻辑：
  // 1. 如果包含 "通过"、"已销假"，或者是 "审核通过"，则显示绿色印章
  if (status.includes('通过') || status === '已通过' || status === '审核通过' || status === '已销假') {
    stampStatus = 'passed';
  } 
  // 2. 否则，如果包含 "审核"、"申请"、"处理中"，则显示蓝色印章
  // 注意："辅导员审核" 会进入这里，因为它不包含 "通过"
  else if (status.includes('审核') || status.includes('处理中') || status === '申请') {
    stampStatus = 'audit';
  }

  return (
    <div className="bg-white p-4 mb-3 relative overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center mb-4 relative z-10">
        <div className="w-1 h-4 bg-[#3478f6] rounded-full mr-2"></div>
        <h2 className="text-base font-bold text-gray-800">请假信息</h2>
      </div>

      {/* Audit Stamp Image (Blue) */}
      {stampStatus === 'audit' && (
        <img 
          src={AUDIT_STAMP_URL}
          alt="审核中"
          className="absolute top-10 right-2 w-20 opacity-80 z-0 pointer-events-none object-contain"
        />
      )}

      {/* Passed Stamp Image (Green) */}
      {stampStatus === 'passed' && (
        <img 
          src={PASSED_STAMP_URL}
          alt="已通过"
          className="absolute top-10 right-2 w-20 opacity-80 z-0 pointer-events-none object-contain"
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
