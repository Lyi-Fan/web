
import React, { useState, useEffect } from 'react';
import { LeaveData } from '../types';
import { Save, X } from 'lucide-react';

interface LeaveFormProps {
  initialData: LeaveData;
  onSubmit: (data: LeaveData) => void;
  onCancel: () => void;
}

// Helper to format JS date to input value (YYYY-MM-DDTHH:mm:ss)
const toInputFormat = (dateStr?: string) => {
  if (!dateStr) return '';
  // Replace space with T for datetime-local input
  return dateStr.replace(' ', 'T');
};

// Helper to format input value to app format (YYYY-MM-DD HH:mm:ss)
const toAppFormat = (inputStr: string) => {
  if (!inputStr) return '';
  // Replace T with space
  let formatted = inputStr.replace('T', ' ');
  // Add seconds if missing (browsers might omit seconds if 00)
  if (formatted.split(':').length === 2) {
      formatted += ':00';
  }
  return formatted;
};

// Get current time in App format
const getCurrentTimeAppFormat = () => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

// Component definitions outside main function to prevent re-mounting
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-gray-600 text-sm font-medium mb-1">{children}</label>
);

const Input = ({ 
  name, 
  value, 
  onChange, 
  type = "text",
  step,
  readOnly
}: { 
  name: string, 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  type?: string,
  step?: string,
  readOnly?: boolean
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    step={step}
    readOnly={readOnly}
    className={`w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors ${readOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
  />
);

export const LeaveForm: React.FC<LeaveFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<LeaveData>(initialData);

  // Set default times on mount if they are empty
  useEffect(() => {
    const currentTime = getCurrentTimeAppFormat();
    setFormData(prev => ({
      ...prev,
      applyTime: prev.applyTime || currentTime,
      approvalTime: prev.approvalTime || currentTime,
      startTime: prev.startTime || currentTime,
      endTime: prev.endTime || currentTime,
    }));
  }, []);

  // Auto-calculate duration when start or end time changes
  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      // Replace - with / for safer cross-browser parsing if needed, though standard ISO usually works
      const start = new Date(formData.startTime.replace(/-/g, '/'));
      const end = new Date(formData.endTime.replace(/-/g, '/'));
      
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diff = end.getTime() - start.getTime();
        if (diff > 0) {
           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
           const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
           const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
           const durationStr = `${days}天${hours}小时${minutes}分钟`;
           
           setFormData(prev => {
             if (prev.duration === durationStr) return prev;
             return { ...prev, duration: durationStr };
           });
        } else {
           // Prevent negative duration
           setFormData(prev => {
             if (prev.duration === '0天0小时0分钟') return prev;
             return { ...prev, duration: '0天0小时0分钟' };
           });
        }
      }
    }
  }, [formData.startTime, formData.endTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: toAppFormat(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-4 min-h-full pb-8">
      <div className="flex items-center justify-between mb-6 border-b pb-2">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
           <div className="w-1 h-5 bg-[#3478f6] rounded-full mr-2"></div>
           填写请假申请
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>姓名</Label>
          <Input name="name" value={formData.name || ''} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>请假申请时间</Label>
            <Input 
              type="datetime-local" 
              step="1"
              name="applyTime" 
              value={toInputFormat(formData.applyTime)} 
              onChange={handleDateChange} 
            />
          </div>
          <div>
            <Label>申请通过时间</Label>
            <Input 
              type="datetime-local" 
              step="1"
              name="approvalTime" 
              value={toInputFormat(formData.approvalTime)} 
              onChange={handleDateChange} 
            />
          </div>
        </div>

        <div>
          <Label>请假类型</Label>
          <Input name="type" value={formData.type} onChange={handleChange} />
        </div>
        
        <div>
          <Label>请假去向</Label>
          <Input name="destination" value={formData.destination} onChange={handleChange} />
        </div>

        <div>
          <Label>详细地址</Label>
          <Input name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>开始时间</Label>
              <Input 
                type="datetime-local" 
                step="1"
                name="startTime" 
                value={toInputFormat(formData.startTime)} 
                onChange={handleDateChange} 
              />
            </div>
            <div>
              <Label>结束时间</Label>
              <Input 
                type="datetime-local" 
                step="1"
                name="endTime" 
                value={toInputFormat(formData.endTime)} 
                onChange={handleDateChange} 
              />
            </div>
        </div>

        <div>
          <Label>统计时长 (自动计算)</Label>
          <Input name="duration" value={formData.duration} onChange={handleChange} readOnly />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>紧急联系人</Label>
              <Input name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
            </div>
            <div>
              <Label>联系电话</Label>
              <Input name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
            </div>
        </div>

        <div>
          <Label>请假理由</Label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
        </div>

        <div>
          <Label>请假状态</Label>
          <Input name="status" value={formData.status} onChange={handleChange} />
        </div>

        <div>
          <Label>销假状态</Label>
          <Input name="returnStatus" value={formData.returnStatus} onChange={handleChange} />
        </div>

        <div>
          <Label>请假附件</Label>
          <Input name="attachment" value={formData.attachment} onChange={handleChange} />
        </div>

        <div className="pt-6 flex gap-3 sticky bottom-0 bg-white pb-4">
             <button 
               type="button" 
               onClick={onCancel} 
               className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-50"
             >
               <X size={20} />
               取消
             </button>
             <button 
               type="submit" 
               className="flex-1 py-3 bg-[#3478f6] text-white rounded-lg font-medium shadow-lg shadow-blue-200 flex items-center justify-center gap-2 hover:bg-blue-600"
             >
               <Save size={20} />
               提交申请
             </button>
        </div>
      </form>
    </div>
  );
};
