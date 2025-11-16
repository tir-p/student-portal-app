import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grade } from '../interfaces/grade';
import { GradeUtil } from '../../app/utils/grade-util';
import { API_CONFIG } from '../config/api.config';

/**
 * Service to manage grade data
 * Calculates GPA and organizes grades by semester
 */
@Injectable({
  providedIn: 'root'
})
export class GradeService {
  // Private signals to store grade data
  private gradesSignal = signal<Grade[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Public readonly signals for components to use
  readonly grades = this.gradesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor(private http: HttpClient) {}

  /**
   * Computed signal: automatically calculates current GPA from all grades
   * Uses GradeUtil helper to perform the calculation
   */
  readonly currentGPA = computed(() => {
    const allGrades = this.gradesSignal();
    
    // Convert grades to format needed for GPA calculation
    const gradeData: { letterGrade: string, credits: number }[] = [];
    for (const grade of allGrades) {
      gradeData.push({ 
        letterGrade: grade.letterGrade, 
        credits: grade.credits 
      });
    }
    
    // Use utility function to calculate GPA
    return GradeUtil.calculateGPA(gradeData);
  });

  /**
   * Computed signal: groups grades by semester
   * Returns an array where each item contains a semester name and its grades
   */
  readonly semesterGrades = computed(() => {
    const allGrades = this.gradesSignal();
    const semesterMap = new Map<string, Grade[]>();
    
    // Group grades by semester using a Map (used ai for this)
    for (const grade of allGrades) {
      if (!semesterMap.has(grade.semester)) {
        semesterMap.set(grade.semester, []);
      }
      semesterMap.get(grade.semester)!.push(grade);
    }
    
    // Convert Map to array format: [{ semester: string, grades: Grade[] }]
    const result: { semester: string, grades: Grade[] }[] = [];
    for (const [semester, grades] of semesterMap) {
      result.push({ semester, grades });
    }
    
    return result;
  });

  /**
   * Loads all grades for a student from the API
   * @param studentId - The student ID to load grades for
   */
  loadGrades(studentId: number = 1): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<Grade[]>(`${API_CONFIG.baseUrl}/Grade/student/${studentId}`).subscribe({
      next: (grades) => {
        // Convert date strings to Date objects for assignments
        grades.forEach(grade => {
          if (grade.assignments) {
            grade.assignments.forEach(assignment => {
              if (typeof assignment.dueDate === 'string') {
                assignment.dueDate = new Date(assignment.dueDate);
              }
              if (assignment.submittedDate && typeof assignment.submittedDate === 'string') {
                assignment.submittedDate = new Date(assignment.submittedDate);
              }
            });
          }
        });
        this.gradesSignal.set(grades);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(error.message || 'Failed to load grades');
        this.loadingSignal.set(false);
        console.error('Error loading grades:', error);
      }
    });
  }

  /**
   * Finds a grade by course ID
   * Returns the grade or undefined if not found
   */
  getGradeByCourseId(courseId: number): Grade | undefined {
    return this.gradesSignal().find(g => g.courseId === courseId);
  }
}