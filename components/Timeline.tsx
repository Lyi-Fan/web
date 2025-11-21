import React from 'react';
import { Check, Circle } from 'lucide-react';
import { TimelineStep } from '../types';

const steps: TimelineStep[] = [
  {
    status: '申请',
    statusLabel: '申请',
    statusColor: 'text-black',
    statusLabelColor: 'text-green-500',
    person: '刘一宏',
    date: '2025-11-21 09:43',
    isCompleted: true,
    isCurrent: false,
  },
  {
    status: '辅导员审核',
    statusLabel: '处理中',
    statusColor: 'text-black',
    statusLabelColor: 'text-orange-400',
    person: '叶瀚',
    date: '',
    isCompleted: false,
    isCurrent: true,
  },
];

export const Timeline: React.FC = () => {
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
              <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-[#b8cffc]"></div>
            )}

            {/* Icon */}
            <div className="relative z-10 flex-shrink-0 mr-3 bg-white">
                {step.isCompleted ? (
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
                        <span className={`font-medium text-[15px] ${step.statusColor}`}>{step.status}</span>
                        {step.statusLabel && (
                             <span className={`text-sm ${step.statusLabelColor}`}>{step.statusLabel}</span>
                        )}
                    </div>
                    {step.date && (
                        <span className="text-gray-400 text-xs transform scale-90 origin-right">{step.date}</span>
                    )}
                </div>
                <div className="mt-2 text-gray-500 text-sm">
                    {step.person}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};