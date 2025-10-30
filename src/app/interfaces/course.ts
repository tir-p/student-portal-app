export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  semester: string;
  instructor: Instructor;
  schedule: CourseSchedule[];
  enrolledStudents: number;
  maxCapacity: number;
  status: CourseStatus;
  syllabus?: string;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  department: string;
  officeHours?: string;
}

export interface CourseSchedule {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
}

export type CourseStatus = 'active' | 'completed' | 'upcoming' | 'cancelled';