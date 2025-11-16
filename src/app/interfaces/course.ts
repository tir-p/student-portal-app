export interface Course {
  id: number; // Changed from string to number
  code: string;
  name: string;
  description: string;
  credits: number;
  semester: string;
  instructorId?: number;
  instructorName?: string;
  instructor?: Instructor | null; // Nested instructor object
  schedule?: CourseSchedule[] | null; // Nested schedule array
  enrolledStudents: number;
  maxCapacity: number;
  status: CourseStatus;
  syllabus?: string | null;
}

export interface Instructor {
  id: number; // Changed from string to number
  name: string;
  email: string;
  department: string;
  officeHours?: string | null;
}

export interface CourseSchedule {
  id?: number;
  courseId?: number;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  courseName?: string;
}

export type CourseStatus = 'active' | 'completed' | 'upcoming' | 'cancelled' | 'Active' | 'Inactive' | 'Completed';