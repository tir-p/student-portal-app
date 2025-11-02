import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GradeService } from '../services/grade-service';
import { Grade } from '../interfaces/grade';
import { GradeColorPipe } from '../pipes/grade-color-pipe-pipe';
import { SemesterPipe } from '../pipes/semester-pipe-pipe';
import { TimeRemainingPipe } from '../pipes/time-remaining-pipe-pipe';

/**
 * Grade Detail Component
 * Displays detailed information about a specific grade
 * Shows assignments, scores, and grade breakdown
 */
@Component({
  selector: 'app-grade-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    GradeColorPipe,
    SemesterPipe,
    TimeRemainingPipe
  ],
  templateUrl: './grade-detail-component.html',
  styleUrls: ['./grade-detail-component.scss']
})
export class GradeDetailComponent implements OnInit {
  // Signal to store the current grade data
  grade = signal<Grade | undefined>(undefined);
  // Signal to store the grade ID from the route
  gradeId = signal<string>('');
  // Connect to service loading state
  readonly loading;

  constructor(
    private route: ActivatedRoute,
    private gradeService: GradeService
  ) {
    this.loading = this.gradeService.loading;
  }

  /**
   * Called when component initializes
   * Subscribes to route parameters to get grade ID and load grade details
   */
  ngOnInit(): void {
    // Get grade ID from the URL route parameter
    this.route.params.subscribe(params => {
      this.gradeId.set(params['id']);
      this.loadGradeDetails();
    });

    // Load grades if they haven't been loaded yet
    if (this.gradeService.grades().length === 0) {
      this.gradeService.loadGrades();
    }
  }

  /**
   * Loads grade details from the service
   * Finds the grade by ID from the grades array
   * Waits for grades to load if needed
   */
  private loadGradeDetails(): void {
    // Try to find the grade immediately
    const allGrades = this.gradeService.grades();
    const grade = allGrades.find(g => g.id === this.gradeId());
    
    if (grade) {
      // Grade found, set it
      this.grade.set(grade);
    } else if (allGrades.length === 0) {
      // Grades not loaded yet, wait for them to load
      setTimeout(() => {
        const grades = this.gradeService.grades();
        const foundGrade = grades.find(g => g.id === this.gradeId());
        this.grade.set(foundGrade);
      }, 600);
    }
  }

  /**
   * Calculates the percentage score for an assignment
   * @param assignment - The assignment to calculate percentage for
   * @returns Percentage score (0-100)
   */
  getAssignmentPercentage(assignment: any): number {
    if (assignment.maxScore === 0) return 0;
    return (assignment.earnedScore / assignment.maxScore) * 100;
  }

  /**
   * Gets the status badge class for an assignment
   * @param status - Assignment status
   * @returns Bootstrap badge class
   */
  getStatusClass(status: string): string {
    switch (status) {
      case 'graded':
        return 'bg-success';
      case 'submitted':
        return 'bg-info';
      case 'pending':
        return 'bg-warning';
      case 'late':
        return 'bg-danger';
      case 'missing':
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  }
}

