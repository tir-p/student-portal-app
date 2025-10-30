import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeService } from '../services/grade-service';
import { Grade } from '../interfaces/grade';
import { GradeColorPipe } from '../pipes/grade-color-pipe-pipe';
import { SemesterPipe } from '../pipes/semester-pipe-pipe';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [
    CommonModule,
    GradeColorPipe,
    SemesterPipe
  ],
  providers: [GradeService],
  templateUrl: './grades-component.html',
  styleUrls: ['./grades-component.scss']
})
export class GradesComponent implements OnInit {
  readonly grades;
  readonly currentGPA;
  readonly semesterGrades;
  readonly loading;
  
  selectedSemester = signal<string | null>(null);

  constructor(private gradeService: GradeService) {
    this.grades = this.gradeService.grades;
    this.currentGPA = this.gradeService.currentGPA;
    this.semesterGrades = this.gradeService.semesterGrades;
    this.loading = this.gradeService.loading;
  }

  ngOnInit(): void {
    if (this.grades().length === 0) {
      this.gradeService.loadGrades();
    }
  }

  getSemesters(): string[] {
    return Object.keys(this.semesterGrades());
  }

  getGradesForSemester(semester: string): Grade[] {
    return this.semesterGrades()[semester] || [];
  }

  calculateSemesterGPA(semester: string): number {
    const grades = this.getGradesForSemester(semester);
    if (!grades.length) return 0;

    // Type both parameters
    const totalPoints = grades.reduce(
      (accumulator: number, grade: Grade) => accumulator + (grade.gradePoints * grade.credits), 
      0
    );
    
    const totalCredits = grades.reduce(
      (accumulator: number, grade: Grade) => accumulator + grade.credits, 
      0
    );

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }
}