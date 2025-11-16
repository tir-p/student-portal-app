export interface Student {
  id: number; // Changed from string to number to match backend
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  dateOfBirth: string | Date; // Backend returns ISO string, frontend can use Date
  enrollmentDate: string | Date;
  major: string | null;
  year: number;
  gpa: number;
  profileImage?: string | null;
  contactNumber: string;
  address?: Address | null;
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