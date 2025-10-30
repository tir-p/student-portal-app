export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  records: AttendanceRecord[];
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
  status: AttendanceStatus;
}

export interface AttendanceRecord {
  id: string;
  date: Date;
  status: AttendanceRecordStatus;
  remarks?: string;
  classType: ClassType;
}

export type AttendanceRecordStatus = 'present' | 'absent' | 'late' | 'excused';
export type AttendanceStatus = 'good' | 'warning' | 'critical';
export type ClassType = 'lecture' | 'lab' | 'tutorial' | 'seminar';