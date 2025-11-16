export interface Grade {
  id: number; // Changed from string to number
  studentId: number; // Changed from string to number
  studentName?: string;
  courseId: number; // Changed from string to number
  courseName: string;
  courseCode: string;
  semester: string;
  assignments?: Assignment[] | null; // Nested assignments array
  midtermScore?: number | null;
  finalScore?: number | null;
  totalScore: number;
  letterGrade: LetterGrade;
  gradePoints: number;
  credits: number;
  remarks?: string;
}

export interface Assignment {
  id: number; // Changed from string to number
  gradeId?: number;
  name: string;
  maxScore: number;
  earnedScore: number;
  weight: number;
  dueDate: string | Date; // Backend returns ISO string
  submittedDate?: string | Date | null;
  status: AssignmentStatus;
  feedback?: string | null;
}

export type LetterGrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';
export type AssignmentStatus = 'pending' | 'submitted' | 'graded' | 'late' | 'missing' | 'Pending' | 'Submitted' | 'Graded';