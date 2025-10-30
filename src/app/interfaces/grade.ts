export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  semester: string;
  assignments: Assignment[];
  midtermScore?: number;
  finalScore?: number;
  totalScore: number;
  letterGrade: LetterGrade;
  gradePoints: number;
  credits: number;
  remarks?: string;
}

export interface Assignment {
  id: string;
  name: string;
  maxScore: number;
  earnedScore: number;
  weight: number;
  dueDate: Date;
  submittedDate?: Date;
  status: AssignmentStatus;
  feedback?: string;
}

export type LetterGrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';
export type AssignmentStatus = 'pending' | 'submitted' | 'graded' | 'late' | 'missing';