import { Injectable, signal, computed } from '@angular/core';
import { Grade } from '../interfaces/grade';
import { GradeUtil } from '../../app/utils/grade-util';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private gradesSignal = signal<Grade[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  readonly grades = this.gradesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly currentGPA = computed(() => {
    const grades = this.gradesSignal();
    return GradeUtil.calculateGPA(
      grades.map(g => ({ letterGrade: g.letterGrade, credits: g.credits }))
    );
  });

  readonly semesterGrades = computed(() => {
    const grades = this.gradesSignal();
    return grades.reduce((acc, grade) => {
      if (!acc[grade.semester]) {
        acc[grade.semester] = [];
      }
      acc[grade.semester].push(grade);
      return acc;
    }, {} as Record<string, Grade[]>);
  });

  // Mock data
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

  loadGrades(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    setTimeout(() => {
      this.gradesSignal.set(this.mockGrades);
      this.loadingSignal.set(false);
    }, 500);
  }

  getGradeByCourseId(courseId: string): Grade | undefined {
    return this.gradesSignal().find(g => g.courseId === courseId);
  }
}