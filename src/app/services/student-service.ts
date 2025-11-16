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

  constructor(private http: HttpClient) {}

  /**
   * Loads a student profile by ID from the API
   */
  loadStudentProfile(studentId: number | string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    
    this.http.get<Student>(`${API_CONFIG.baseUrl}/Student/${studentId}`).subscribe({
      next: (student) => {
        // Convert date strings to Date objects if needed
        if (typeof student.dateOfBirth === 'string') {
          student.dateOfBirth = new Date(student.dateOfBirth);
        }
        if (typeof student.enrollmentDate === 'string') {
          student.enrollmentDate = new Date(student.enrollmentDate);
        }
        this.studentSignal.set(student);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(error.message || 'Failed to load student profile');
        this.loadingSignal.set(false);
        console.error('Error loading student profile:', error);
      }
    });
  }

  /**
   * Updates the student profile via API
   */
  updateStudentProfile(studentId: number, updatedStudent: Student): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    
    this.http.put<Student>(`${API_CONFIG.baseUrl}/Student/${studentId}`, updatedStudent).subscribe({
      next: (student) => {
        // Convert date strings to Date objects if needed
        if (typeof student.dateOfBirth === 'string') {
          student.dateOfBirth = new Date(student.dateOfBirth);
        }
        if (typeof student.enrollmentDate === 'string') {
          student.enrollmentDate = new Date(student.enrollmentDate);
        }
        this.studentSignal.set(student);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(error.message || 'Failed to update student profile');
        this.loadingSignal.set(false);
        console.error('Error updating student profile:', error);
      }
    });
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