import React, { useState, useRef, useEffect } from 'react';
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
    name: '刘一宏',
    applyTime: '2025-11-21 09:43:23',
    approvalTime: '2025-11-21 14:15:00',
    startTime: '2025-11-22 08:41:00',
    endTime: '2025-11-22 22:30:00',
    reason: '学校后门饭店',
    status: '辅导员审核',
    destination: '',
    address: '',
    duration: '0天13小时49分钟',
    contactPerson: '',
    contactPhone: '',
    returnStatus: '',
    attachment: ''
  },
  {
    id: '2',
    type: '节假日及寒暑假请假',
    name: '刘一宏',
    applyTime: '2025-09-30 16:48:52',
    approvalTime: '2025-09-30 17:00:00',
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
    name: '刘一宏',
    applyTime: '2025-09-26 17:01:08',
    approvalTime: '',
    startTime: '2025-09-27 07:00:00',
    endTime: '2025-09-27 21:00:00',
    reason: '外出办事',
    status: '申请',
    destination: '',
    address: '',
    duration: '0天14小时0分钟',
    contactPerson: '',
    contactPhone: '',
    returnStatus: '',
    attachment: ''
  }
];

const emptyLeaveData: LeaveData = {
  id: '0',
  type: '其它',
  name: '',
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
  approvalTime: '',
};

type ViewMode = 'LIST' | 'DETAIL' | 'FORM';

const App: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveData[]>(initialLeaves);
  const [viewMode, setViewMode] = useState<ViewMode>('LIST');
  const [selectedLeave, setSelectedLeave] = useState<LeaveData>(initialLeaves[0]);
  const [isManageMode, setIsManageMode] = useState(false);
  const secondaryPageRef = useRef<HTMLDivElement>(null);

  // Handle Browser Back Button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // If state exists, user is navigating forward/back within app history
      // For this simple app, if we pop state and it's null or list, go to LIST
      if (event.state && event.state.view) {
        setViewMode(event.state.view);
      } else {
        // Fallback to list if no state (e.g. initial load or back to root)
        setViewMode('LIST');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (mode: ViewMode) => {
    setViewMode(mode);
    // Push new state to history so back button works
    // If we are going to LIST, we might technically want to replace state or push, 
    // but for simple drill-down, pushing is fine.
    if (mode === 'LIST') {
        // If going back to list manually (breadcrumb), we can either push 'LIST' 
        // or simulate back. Let's push to keep it simple, or rely on handleBack logic.
        // However, to support the "Breadcrumb click", we generally just want to go back.
        // But if we push, we create a new forward entry.
        // Let's use pushState for forward navigation (Detail/Form).
    } else {
        window.history.pushState({ view: mode }, '');
    }
  };

  const handleSelectLeave = (data: LeaveData) => {
    setSelectedLeave(data);
    // Reset scroll position
    if (secondaryPageRef.current) {
      secondaryPageRef.current.scrollTop = 0;
    }
    navigateTo('DETAIL');
  };

  const handleApply = () => {
    // Reset scroll position
    if (secondaryPageRef.current) {
      secondaryPageRef.current.scrollTop = 0;
    }
    navigateTo('FORM');
  };

  const handleCreateLeave = (data: LeaveData) => {
    const newLeave: LeaveData = {
      ...data,
      id: Date.now().toString(),
      applyTime: data.applyTime || new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: '申请', // Default new status
    };
    
    setLeaves((prev) => [newLeave, ...prev]);
    // Go back to list
    window.history.back();
  };

  const handleDeleteLeave = (id: string) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      setLeaves((prevLeaves) => prevLeaves.filter((l) => l.id !== id));
    }
  };

  // This is called by breadcrumb or explicit back buttons
  const handleBackToList = () => {
    if (viewMode !== 'LIST') {
      // Trigger browser back, which will fire popstate and update viewMode
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex justify-center">
      {/* Mobile container simulation */}
      <div className="w-full max-w-[480px] bg-[#f3f4f6] shadow-lg min-h-screen flex flex-col relative overflow-hidden">
        
        <Breadcrumb viewMode={viewMode} onNavigate={handleBackToList} />
        
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
              onToggleManage={() => setIsManageMode(!isManageMode)}
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
                 onCancel={handleBackToList} 
               />
             )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default App;