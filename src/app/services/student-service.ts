import { Injectable, signal, computed } from '@angular/core';
import { Student } from '../interfaces/student';
import { Observable, of, delay } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // Angular Signals for state management
  private studentSignal = signal<Student | null>(null);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Computed signals
  // Exposes the current student as a readonly signal so consumers can observe changes but not modify directly
  readonly student = this.studentSignal.asReadonly();
  // Exposes the loading state as a readonly signal for UI to react to loading changes
  readonly loading = this.loadingSignal.asReadonly();
  // Exposes the error state as a readonly signal for error handling in the UI
  readonly error = this.errorSignal.asReadonly();
  // Computed signal that returns the student's full name, or an empty string if no student is loaded
  readonly fullName = computed(() => {
    const student = this.studentSignal(); // Get the current student value
    return student ? `${student.firstName} ${student.lastName}` : ''; // Return full name if student exists, else empty string
  });

  // Fake data
  private mockStudent: Student = {
    id: '1',
    firstName: 'Tirthesh',
    lastName: 'Parbutee',
    email: 'tirthesh.parbutee@university.mu',
    studentId: 'CS202101',
    dateOfBirth: new Date('2002-05-15'),
    enrollmentDate: new Date('2021-09-01'),
    major: 'Computer Science',
    year: 3,
    gpa: 3.75,
    contactNumber: '+230-5123-4567',
    profileImage: 'assets/images/default-avatar.png',
    address: {
      street: '123 University Street',
      city: 'Reduit',
      state: 'Moka',
      zipCode: '80837',
      country: 'Mauritius'
    }
  };

  loadStudentProfile(studentId: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.studentSignal.set(this.mockStudent);
    this.loadingSignal.set(false);
  }

  updateStudentProfile(updatedStudent: Student): Observable<Student> {
    this.loadingSignal.set(true);
    this.studentSignal.set(updatedStudent);
    this.loadingSignal.set(false);
    return of(updatedStudent);
  }

  clearStudent(): void {
    this.studentSignal.set(null);
    this.errorSignal.set(null);
  }
}