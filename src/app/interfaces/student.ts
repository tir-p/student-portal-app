export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  dateOfBirth: Date;
  enrollmentDate: Date;
  major: string;
  year: number;
  gpa: number;
  profileImage?: string;
  contactNumber: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}