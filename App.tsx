
import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Breadcrumb } from './components/Breadcrumb';
import { LeaveListPage } from './components/LeaveListPage';
import { LeaveDetailPage } from './components/LeaveDetailPage';
import { LeaveForm } from './components/LeaveForm';
import { LeaveData } from './types';

// Initial Mock Data
const initialLeaves: LeaveData[] = [
  {
    id: '1',
    type: '其它',
    applyTime: '2025-11-21 09:43:23',
    startTime: '2025-11-22 08:41:00',
    endTime: '2025-11-22 22:30:00',
    reason: '学校后门饭店',
    status: '辅导员审核',
    destination: '',
    address: '',
    duration: '天小时分钟',
    contactPerson: '',
    contactPhone: '',
    returnStatus: '',
    attachment: ''
  },
  {
    id: '2',
    type: '节假日及寒暑假请假',
    applyTime: '2025-09-30 16:48:52',
    startTime: '2025-09-30 16:47:00',
    endTime: '2025-10-08 17:30:00',
    reason: '国庆节',
    status: '审核通过',
    destination: '',
    address: '',
    duration: '8天0小时43分钟',
    contactPerson: '',
    contactPhone: '',
    returnStatus: '已销假',
    attachment: ''
  },
  {
    id: '3',
    type: '其它',
    applyTime: '2025-09-26 17:01:08',
    startTime: '2025-09-27 07:00:00',
    endTime: '2025-09-27 21:00:00',
    reason: '外出办事',
    status: '申请',
    destination: '',
    address: '',
    duration: '14小时',
    contactPerson: '',
    contactPhone: '',
    returnStatus: '',
    attachment: ''
  }
];

const emptyLeaveData: LeaveData = {
  id: '0',
  type: '其它',
  destination: '',
  address: '',
  startTime: '',
  endTime: '',
  duration: '',
  contactPerson: '',
  contactPhone: '',
  reason: '',
  status: '申请',
  returnStatus: '',
  attachment: '',
};

type ViewMode = 'LIST' | 'DETAIL' | 'FORM';

const App: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveData[]>(initialLeaves);
  const [viewMode, setViewMode] = useState<ViewMode>('LIST');
  const [selectedLeave, setSelectedLeave] = useState<LeaveData>(initialLeaves[0]);
  const [isManageMode, setIsManageMode] = useState(false);
  const secondaryPageRef = useRef<HTMLDivElement>(null);

  const handleSelectLeave = (data: LeaveData) => {
    setSelectedLeave(data);
    // Reset scroll position
    if (secondaryPageRef.current) {
      secondaryPageRef.current.scrollTop = 0;
    }
    setViewMode('DETAIL');
  };

  const handleApply = () => {
    // Reset scroll position
    if (secondaryPageRef.current) {
      secondaryPageRef.current.scrollTop = 0;
    }
    setViewMode('FORM');
  };

  const handleCreateLeave = (data: LeaveData) => {
    const newLeave: LeaveData = {
      ...data,
      id: Date.now().toString(),
      applyTime: new Date().toISOString().replace('T', ' ').substring(0, 19), // Simple format YYYY-MM-DD HH:mm:ss
      status: '申请', // Default new status
    };
    
    setLeaves((prev) => [newLeave, ...prev]);
    setViewMode('LIST');
  };

  const handleDeleteLeave = (id: string) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      setLeaves((prevLeaves) => prevLeaves.filter((l) => l.id !== id));
    }
  };

  const handleBack = () => {
    if (viewMode !== 'LIST') {
      setViewMode('LIST');
    } else if (isManageMode) {
      setIsManageMode(false);
    }
  };

  // Define menu actions based on current state
  const menuActions = [
    {
      label: isManageMode ? '完成' : '管理',
      onClick: () => setIsManageMode(!isManageMode),
      color: isManageMode ? 'text-blue-600 font-medium' : ''
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex justify-center">
      {/* Mobile container simulation */}
      <div className="w-full max-w-[480px] bg-[#f3f4f6] shadow-lg min-h-screen flex flex-col relative overflow-hidden">
        
        <Header 
          onBack={handleBack} 
          menuActions={viewMode === 'LIST' ? menuActions : []} 
        />
        <Breadcrumb />
        
        {/* Main Content Area with Sliding Transition */}
        <main className="flex-1 relative overflow-hidden w-full">
          
          {/* List Page Layer */}
          <div 
            className={`absolute inset-0 w-full h-full bg-[#f3f4f6] transition-transform duration-300 ease-out will-change-transform ${
              viewMode !== 'LIST' ? '-translate-x-[25%] opacity-90 pointer-events-none' : 'translate-x-0 opacity-100'
            }`}
          >
            <LeaveListPage 
              leaves={leaves} 
              onSelectLeave={handleSelectLeave} 
              onApply={handleApply}
              isManageMode={isManageMode}
              onDeleteLeave={handleDeleteLeave}
            />
          </div>

          {/* Secondary Page Layer (Detail or Form) */}
          <div 
            ref={secondaryPageRef}
            className={`absolute inset-0 w-full h-full overflow-y-auto no-scrollbar bg-[#f3f4f6] transition-transform duration-300 ease-out will-change-transform shadow-[-10px_0_20px_rgba(0,0,0,0.05)] ${
              viewMode !== 'LIST' ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
             {viewMode === 'DETAIL' && (
               <LeaveDetailPage initialData={selectedLeave} />
             )}
             {viewMode === 'FORM' && (
               <LeaveForm 
                 initialData={emptyLeaveData} 
                 onSubmit={handleCreateLeave} 
                 onCancel={() => setViewMode('LIST')} 
               />
             )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default App;
