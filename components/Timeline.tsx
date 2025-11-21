
import React from 'react';
import { Check } from 'lucide-react';

interface TimelineItem {
  status: string;
  statusLabel?: string;
  statusLabelColor?: string;
  date?: string;
  person?: string;
  extraRight?: string;
  extraRightColor?: string;
  icon: 'check' | 'dot';
}

interface TimelineProps {
  applicantName?: string;
  applyTime?: string;
  approvalTime?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ applicantName, applyTime, approvalTime }) => {
  // Helper to format YYYY-MM-DD HH:mm:ss to YYYY-MM-DD HH:mm
  const formatTime = (timeStr?: string) => {
    if (!timeStr) return '';
    return timeStr.substring(0, 16);
  };

  const steps: TimelineItem[] = [
    {
      status: '申请',
      statusLabel: '申请',
      statusLabelColor: 'text-[#00b578]',
      date: formatTime(applyTime) || '2025-11-21 09:43', // Use real apply time if available
      person: applicantName || '刘一宏', // Use dynamic name or default
      icon: 'check',
    },
    {
      status: '辅导员审核',
      statusLabel: '审核通过',
      statusLabelColor: 'text-[#00b578]',
      date: formatTime(approvalTime) || '2025-11-21 14:15',
      person: '叶瀚',
      extraRight: '同意',
      extraRightColor: 'text-[#3478f6]',
      icon: 'check',
    },
    {
      status: '结束',
      icon: 'dot',
    },
  ];

  return (
    <div className="bg-white p-4">
       {/* Section Header */}
       <div className="flex items-center mb-6">
        <div className="w-1 h-4 bg-[#3478f6] rounded-full mr-2"></div>
        <h2 className="text-base font-bold text-gray-800">办理进度</h2>
      </div>

      <div className="pl-2">
        {steps.map((step, index) => (
          <div key={index} className="relative flex pb-8 last:pb-0">
             {/* Connecting Line */}
            {index !== steps.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-[#e0e0e0]"></div>
            )}

            {/* Icon */}
            <div className="relative z-10 flex-shrink-0 mr-3 bg-white pr-1">
                {step.icon === 'check' ? (
                   <div className="w-6 h-6 rounded-full border border-[#3478f6] flex items-center justify-center bg-white">
                       <Check size={14} className="text-[#3478f6]" strokeWidth={3} />
                   </div>
                ) : (
                    <div className="w-6 h-6 rounded-full border border-[#3478f6] flex items-center justify-center bg-white">
                        <div className="w-2.5 h-2.5 bg-[#3478f6] rounded-full"></div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 -mt-1">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[15px] text-gray-800">{step.status}</span>
                        {step.statusLabel && (
                             <span className={`text-sm font-medium ${step.statusLabelColor}`}>{step.statusLabel}</span>
                        )}
                    </div>
                    {step.date && (
                        <span className="text-gray-400 text-xs pt-1">{step.date}</span>
                    )}
                </div>
                
                {/* Person and Extra Info */}
                {(step.person || step.extraRight) && (
                    <div className="flex justify-between items-center mt-1">
                        <div className="text-gray-500 text-sm">
                            {step.person}
                        </div>
                        {step.extraRight && (
                             <div className={`text-sm font-medium ${step.extraRightColor || 'text-[#3478f6]'}`}>
                                {step.extraRight}
                             </div>
                        )}
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
