import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../interfaces/student';
import { API_CONFIG } from '../config/api.config';

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

  // Full name computed signal
  readonly fullName = computed(() => {
    const s = this.studentSignal();
    return s ? `${s.firstName} ${s.lastName}` : '';
  });

  constructor(private http: HttpClient) {}

  loadStudentProfile(studentId: number | string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<Student>(`${API_CONFIG.baseUrl}/Student/${studentId}`)
      .subscribe({
        next: (student) => {
          // Convert ISO strings to Date
          if (student.dateOfBirth) student.dateOfBirth = new Date(student.dateOfBirth);
          if (student.enrollmentDate) student.enrollmentDate = new Date(student.enrollmentDate);
          this.studentSignal.set(student);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message || 'Failed to load student profile');
          this.loadingSignal.set(false);
          console.error(err);
        }
      });
  }

  /**
   * Update student without sending grades
   */
  updateStudentProfile(studentId: number, updatedStudent: Student): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // Clone object and remove grades to avoid FK conflicts
    const payload = { ...updatedStudent };
    delete payload.grades; // Important!

    this.http.put<Student>(`${API_CONFIG.baseUrl}/Student/${studentId}`, payload)
      .subscribe({
        next: (student) => {
          if (student.dateOfBirth) student.dateOfBirth = new Date(student.dateOfBirth);
          if (student.enrollmentDate) student.enrollmentDate = new Date(student.enrollmentDate);
          this.studentSignal.set(student);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message || 'Failed to update student profile');
          this.loadingSignal.set(false);
          console.error(err);
        }
      });
  }

  clearStudent(): void {
    this.studentSignal.set(null);
    this.errorSignal.set(null);
  }
}
