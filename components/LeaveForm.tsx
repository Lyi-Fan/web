
import React, { useState } from 'react';
import { LeaveData } from '../types';
import { Save, X } from 'lucide-react';

interface LeaveFormProps {
  initialData: LeaveData;
  onSubmit: (data: LeaveData) => void;
  onCancel: () => void;
}

export const LeaveForm: React.FC<LeaveFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<LeaveData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-gray-600 text-sm font-medium mb-1">{children}</label>
  );

  const Input = ({ name, value, type = "text" }: { name: keyof LeaveData, value: string, type?: string }) => (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
    />
  );

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
          <Label>请假类型</Label>
          <Input name="type" value={formData.type} />
        </div>
        
        <div>
          <Label>请假去向</Label>
          <Input name="destination" value={formData.destination} />
        </div>

        <div>
          <Label>详细地址</Label>
          <Input name="address" value={formData.address} />
        </div>

        <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>开始时间</Label>
              <Input name="startTime" value={formData.startTime} />
            </div>
            <div>
              <Label>结束时间</Label>
              <Input name="endTime" value={formData.endTime} />
            </div>
        </div>

        <div>
          <Label>统计时长</Label>
          <Input name="duration" value={formData.duration} />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>紧急联系人</Label>
              <Input name="contactPerson" value={formData.contactPerson} />
            </div>
            <div>
              <Label>联系电话</Label>
              <Input name="contactPhone" value={formData.contactPhone} />
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
          <Input name="status" value={formData.status} />
        </div>

        <div>
          <Label>销假状态</Label>
          <Input name="returnStatus" value={formData.returnStatus} />
        </div>

        <div>
          <Label>请假附件</Label>
          <Input name="attachment" value={formData.attachment} />
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
