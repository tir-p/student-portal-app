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
  readonly student = this.studentSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly fullName = computed(() => {
    const student = this.studentSignal();
    return student ? `${student.firstName} ${student.lastName}` : '';
  });

  // Fake data
  private mockStudent: Student = {
    id: '1',
    firstName: 'Tirthesh',
    lastName: 'Patel',
    email: 'tirthesh.patel@university.mu',
    studentId: 'CS202101',
    dateOfBirth: new Date('2002-05-15'),
    enrollmentDate: new Date('2021-09-01'),
    major: 'Computer Science',
    year: 4,
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

    // Simulate API call
    setTimeout(() => {
      try {
        this.studentSignal.set(this.mockStudent);
        this.loadingSignal.set(false);
      } catch (error) {
        this.errorSignal.set('Failed to load student profile');
        this.loadingSignal.set(false);
      }
    }, 500);
  }

  updateStudentProfile(updatedStudent: Partial<Student>): Observable<Student> {
    this.loadingSignal.set(true);

    const currentStudent = this.studentSignal();
    const updated = { ...currentStudent, ...updatedStudent } as Student;

    // Simulate API call
    return of(updated).pipe(
      delay(500),
      tap(student => {
        this.studentSignal.set(student);
        this.loadingSignal.set(false);
      })
    );
  }

  clearStudent(): void {
    this.studentSignal.set(null);
    this.errorSignal.set(null);
  }
}