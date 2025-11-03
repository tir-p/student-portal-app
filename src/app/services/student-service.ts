import { Injectable, signal, computed } from '@angular/core';
import { Student } from '../interfaces/student';
import { Observable, of } from 'rxjs';

/**
 * Service to manage student data
 * Uses Angular Signals for reactive state management
 */
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // Private signals to store the actual data
  private studentSignal = signal<Student | null>(null);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Public readonly signals - components can read these but not modify them
  readonly student = this.studentSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  
  // Computed signal that automatically calculates full name from first and last name
  readonly fullName = computed(() => {
    const student = this.studentSignal();
    return student ? `${student.firstName} ${student.lastName}` : '';
  });

  // Mock student data - in a real app, this would come from an API
  private mockStudent: Student = {
    id: '1',
    firstName: 'Tirthesh',
    lastName: 'Parbutee',
    email: 'tirthesh.parbutee@university.mu',
    studentId: 'CS202101',
    dateOfBirth: new Date('2003-10-22'),
    enrollmentDate: new Date('2023-06-01'),
    major: 'Computer Science',
    year: 3,
    gpa: 3.75,
    contactNumber: '+230-5123-4567',
    profileImage: '/assets/images/default-avatar.png',
    address: {
      street: '123 University Street',
      city: 'Reduit',
      state: 'Moka',
      zipCode: '80837',
      country: 'Mauritius'
    }
  };

  /**
   * Loads a student profile by ID
   * In a real app, this would fetch from an API
   */
  loadStudentProfile(studentId: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    // Set the mock student data
    this.studentSignal.set(this.mockStudent);
    this.loadingSignal.set(false);
  }

  /**
   * Updates the student profile
   * Returns an Observable that emits the updated student
   */
  updateStudentProfile(updatedStudent: Student): void {
    this.loadingSignal.set(true);
    this.studentSignal.set(updatedStudent);
    this.loadingSignal.set(false);
  }

  /**
   * Clears the current student data
   * Useful for logout or reset scenarios
   */
  clearStudent(): void {
    this.studentSignal.set(null);
    this.errorSignal.set(null);
  }
}