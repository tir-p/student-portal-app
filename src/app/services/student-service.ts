import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../interfaces/student';
import { API_CONFIG } from '../config/api.config';

/**
 * Service to manage student data
 * Uses Angular Signals for reactive state management
 */
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentSignal = signal<Student | null>(null);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  readonly student = this.studentSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Computed signal for full name
  readonly fullName = computed(() => {
    const student = this.studentSignal();
    return student ? `${student.firstName} ${student.lastName}` : '';
  });

  constructor(private http: HttpClient) {}

  /**
   * Loads a student profile by ID from the API
   * GPA and TotalCredits are now computed in the backend
   */
  loadStudentProfile(studentId: number | string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<Student>(`${API_CONFIG.baseUrl}/Student/${studentId}`)
      .subscribe({
        next: (student) => {
          // Convert string dates to Date objects if needed
          if (typeof student.dateOfBirth === 'string') {
            student.dateOfBirth = new Date(student.dateOfBirth);
          }
          if (typeof student.enrollmentDate === 'string') {
            student.enrollmentDate = new Date(student.enrollmentDate);
          }

          this.studentSignal.set(student);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message || 'Failed to load student profile');
          this.loadingSignal.set(false);
          console.error('Error loading student profile:', err);
        }
      });
  }

  /**
   * Updates the student profile via API
   * GPA is computed in backend
   */
  updateStudentProfile(studentId: number, updatedStudent: Student): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.put<Student>(`${API_CONFIG.baseUrl}/Student/${studentId}`, updatedStudent)
      .subscribe({
        next: (student) => {
          if (typeof student.dateOfBirth === 'string') {
            student.dateOfBirth = new Date(student.dateOfBirth);
          }
          if (typeof student.enrollmentDate === 'string') {
            student.enrollmentDate = new Date(student.enrollmentDate);
          }

          this.studentSignal.set(student);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message || 'Failed to update student profile');
          this.loadingSignal.set(false);
          console.error('Error updating student profile:', err);
        }
      });
  }

  /**
   * Clears the current student data
   */
  clearStudent(): void {
    this.studentSignal.set(null);
    this.errorSignal.set(null);
  }
}
