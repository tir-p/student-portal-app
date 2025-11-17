export interface Student {
  id: number; // Matches backend
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  dateOfBirth: string | Date; // Backend returns ISO string
  enrollmentDate: string | Date;
  major: string | null;
  year: number;
  gpa: number;           // GPA comes from backend
  totalCredits: number;  // NEW: cumulative credits from backend
  profileImage?: string | null;
  contactNumber: string;
  address?: Address | null;
  grades?: StudentGrade[]; // Optional list of course grades
}

export interface Address {
  id?: number;
  studentId?: number;
  street: string;
  city: string;
  state: string | null;
  zipCode: string | null;
  country: string;
}

// NEW: interface to represent each course grade
export interface StudentGrade {
  letterGrade: string;
  credits: number;
  courseName?: string;
  courseCode?: string;
  semester?: string;
}
