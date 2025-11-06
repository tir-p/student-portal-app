import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GradeService } from '../../services/grade-service';
import { Grade } from '../../interfaces/grade';
import { GradeColorPipe } from '../../pipes/grade-color-pipe-pipe';
import { SemesterPipe } from '../../pipes/semester-pipe-pipe';

/**
 * Grades Component
 * Displays student grades organized by semester
 * Shows GPA and allows filtering by semester
 */
@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    GradeColorPipe,
    SemesterPipe
  ],
  providers: [GradeService],
  templateUrl: './grades-component.html',
  styleUrls: ['./grades-component.scss']
})
export class GradesComponent implements OnInit {
  // Read signals from the grade service
  readonly grades;
  readonly currentGPA;
  readonly semesterGrades;
  readonly loading;
  
  // Signal to track which semester is currently selected (null = show all)
  selectedSemester = signal<string | null>(null);

  constructor(private gradeService: GradeService) {
    // Connect to service signals so we can use them in the template
    this.grades = this.gradeService.grades;
    this.currentGPA = this.gradeService.currentGPA;
    this.semesterGrades = this.gradeService.semesterGrades;
    this.loading = this.gradeService.loading;
  }

  /**
   * Called when component initializes
   * Loads grades if they haven't been loaded yet
   */
  ngOnInit(): void {
    if (this.grades().length === 0) {
      this.gradeService.loadGrades();
    }
  }

  /**
   * Gets list of all semester names
   * Extracts semester strings from the semesterGrades array
   */
  getSemesters(): string[] {
    const semesterData = this.semesterGrades();
    return semesterData.map(item => item.semester);
  }

  /**
   * Gets all grades for a specific semester
   * @param semester - The semester to get grades for
   * @returns Array of grades for that semester
   */
  getGradesForSemester(semester: string): Grade[] {
    const semesterData = this.semesterGrades();
    
    // Find the semester in the array and return its grades
    const semesterItem = semesterData.find(item => item.semester === semester);
    return semesterItem ? semesterItem.grades : [];
  }

  /**
   * Calculates GPA for a specific semester
   * Formula: (sum of grade points × credits) / total credits
   * @param semester - The semester to calculate GPA for
   * @returns GPA as a number (0 if no grades)
   */
  calculateSemesterGPA(semester: string): number {
    const grades = this.getGradesForSemester(semester);
    if (grades.length === 0) return 0;

    // Calculate total grade points (grade points × credits for each course)
    let totalPoints = 0;
    for (const grade of grades) {
      totalPoints += grade.gradePoints * grade.credits;
    }
    
    // Calculate total credits
    let totalCredits = 0;
    for (const grade of grades) {
      totalCredits += grade.credits;
    }

    // GPA = total points / total credits
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }
}