export interface Attendance {
  id: number; // Changed from string to number
  studentId: number; // Changed from string to number
  courseId: number; // Changed from string to number
  courseName: string;
  courseCode: string;
  records?: AttendanceRecord[] | null; // Nested records array
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
  status: AttendanceStatus;
}

export interface AttendanceRecord {
  id: number; // Changed from string to number
  attendanceId?: number;
  date: string | Date; // Backend returns ISO string
  status: AttendanceRecordStatus;
  remarks?: string | null;
  classType: ClassType;
}

export type AttendanceRecordStatus = 'present' | 'absent' | 'late' | 'excused' | 'Present' | 'Absent' | 'Late' | 'Excused';
export type AttendanceStatus = 'good' | 'warning' | 'critical' | 'Good' | 'Warning' | 'Critical';
export type ClassType = 'lecture' | 'lab' | 'tutorial' | 'seminar' | 'Lecture' | 'Lab' | 'Tutorial' | 'Seminar';