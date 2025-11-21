
import React from 'react';
import { UserProfile } from './UserProfile';
import { LeaveInfoCard } from './LeaveInfoCard';
import { Timeline } from './Timeline';
import { LeaveData } from '../types';

interface LeaveDetailPageProps {
  initialData: LeaveData;
}

export const LeaveDetailPage: React.FC<LeaveDetailPageProps> = ({ initialData }) => {
  return (
    <>
      {/* User Profile Section */}
      <UserProfile />

      {/* Leave Info Section */}
      <LeaveInfoCard data={initialData} />

      {/* Timeline Section */}
      <Timeline 
        applicantName={initialData.name} 
        applyTime={initialData.applyTime} 
        approvalTime={initialData.approvalTime}
      />
      
      {/* Bottom Spacing */}
      <div className="h-8"></div>
    </>
  );
};
