import { Injectable, signal, computed } from '@angular/core';
import { Grade } from '../interfaces/grade';
import { GradeUtil } from '../../app/utils/grade-util';

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
    
    // Group grades by semester using a Map
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

  // Mock grade data - in a real app, this would come from an API
  private mockGrades: Grade[] = [
    {
      id: '1',
      studentId: '1',
      courseId: '1',
      courseName: 'Advanced Software Engineering',
      courseCode: 'CSE-4101',
      semester: 'fall-2024',
      assignments: [
        {
          id: 'a1',
          name: 'Design Patterns Assignment',
          maxScore: 100,
          earnedScore: 92,
          weight: 20,
          dueDate: new Date('2024-10-15'),
          submittedDate: new Date('2024-10-14'),
          status: 'graded',
          feedback: 'Excellent work on implementing the Factory pattern!'
        },
        {
          id: 'a2',
          name: 'Architecture Documentation',
          maxScore: 100,
          earnedScore: 88,
          weight: 20,
          dueDate: new Date('2024-11-05'),
          submittedDate: new Date('2024-11-05'),
          status: 'graded'
        },
        {
          id: 'a3',
          name: 'Final Project',
          maxScore: 100,
          earnedScore: 0,
          weight: 40,
          dueDate: new Date('2024-12-15'),
          status: 'pending'
        }
      ],
      midtermScore: 85,
      totalScore: 90,
      letterGrade: 'A',
      gradePoints: 4.0,
      credits: 3
    },
    {
      id: '2',
      studentId: '1',
      courseId: '2',
      courseName: 'Machine Learning',
      courseCode: 'CSE-4102',
      semester: 'fall-2024',
      assignments: [
        {
          id: 'a4',
          name: 'Linear Regression Lab',
          maxScore: 100,
          earnedScore: 95,
          weight: 15,
          dueDate: new Date('2024-10-20'),
          submittedDate: new Date('2024-10-19'),
          status: 'graded'
        },
        {
          id: 'a5',
          name: 'Neural Networks Project',
          maxScore: 100,
          earnedScore: 0,
          weight: 35,
          dueDate: new Date('2024-11-25'),
          status: 'pending'
        }
      ],
      midtermScore: 88,
      totalScore: 87,
      letterGrade: 'B+',
      gradePoints: 3.3,
      credits: 4
    },
    {
      id: '3',
      studentId: '1',
      courseId: '3',
      courseName: 'Cloud Computing',
      courseCode: 'CSE-4103',
      semester: 'fall-2024',
      assignments: [
        {
          id: 'a6',
          name: 'AWS Deployment',
          maxScore: 100,
          earnedScore: 90,
          weight: 25,
          dueDate: new Date('2024-10-30'),
          submittedDate: new Date('2024-10-29'),
          status: 'graded'
        }
      ],
      totalScore: 92,
      letterGrade: 'A-',
      gradePoints: 3.7,
      credits: 3
    }
  ];

  /**
   * Loads all grades for the student
   * Uses setTimeout to simulate API call delay
   */
  loadGrades(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // Simulate API delay, then set the mock grades
    setTimeout(() => {
      this.gradesSignal.set(this.mockGrades);
      this.loadingSignal.set(false);
    }, 500);
  }

  /**
   * Finds a grade by course ID
   * Returns the grade or undefined if not found
   */
  getGradeByCourseId(courseId: string): Grade | undefined {
    return this.gradesSignal().find(g => g.courseId === courseId);
  }
}