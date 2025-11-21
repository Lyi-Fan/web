
export interface LeaveDetail {
  label: string;
  value: string;
  isHighlight?: boolean; // For blue text
}

export interface TimelineStep {
  status: string;
  statusColor?: string; // text color class
  statusLabel?: string; // e.g. "申请", "处理中"
  statusLabelColor?: string;
  date?: string;
  person: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface LeaveData {
  id?: string; // Unique identifier
  type: string;
  name?: string; // Name of the applicant
  applyTime?: string; // Time the application was made
  approvalTime?: string; // Time the application was approved
  destination: string;
  address: string;
  startTime: string;
  endTime: string;
  duration: string;
  contactPerson: string;
  contactPhone: string;
  reason: string;
  status: string;
  returnStatus: string;
  attachment: string;
}
