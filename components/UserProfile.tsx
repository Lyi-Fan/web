import React from 'react';

export const UserProfile: React.FC = () => {
  return (
    <div className="bg-white p-4 mb-3 flex items-center">
      {/* Avatar Placeholder */}
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
        {/* Simulating the white silhouette on gray background from screenshot */}
         <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
         </svg>
      </div>
      
      {/* User Info (Simulated based on screenshot layout) */}
      <div className="flex items-center gap-2">
         {/* Name is obscured in screenshot, usually would be here. Leaving blank space to match visual structure or just the gender icon row */}
         <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1">
                 {/* Gender Icon */}
                <span className="text-[#3478f6]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="10" cy="14" r="6"></circle>
                        <line x1="20" y1="4" x2="14.5" y2="9.5"></line>
                        <line x1="20" y1="4" x2="20" y2="9"></line>
                        <line x1="20" y1="4" x2="15" y2="4"></line>
                    </svg>
                </span>
                {/* Vertical Separator */}
                <span className="text-gray-300">|</span>
            </div>
            {/* Invisible text to hold height if needed, or empty as per screenshot top part */}
         </div>
      </div>
    </div>
  );
};