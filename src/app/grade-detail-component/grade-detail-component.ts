import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GradeService } from '../services/grade-service';
import { Grade } from '../interfaces/grade';
import { GradeColorPipe } from '../pipes/grade-color-pipe-pipe';
import { SemesterPipe } from '../pipes/semester-pipe-pipe';
import { TimeRemainingPipe } from '../pipes/time-remaining-pipe-pipe';
import { toSignal } from '@angular/core/rxjs-interop';

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
  // Route paramMap as a signal; avoids direct Observable usage
  private paramMapSignal;
  // Grade ID derived from route paramMap
  readonly gradeId = computed<string>(() => this.paramMapSignal().get('id') ?? '');
  // Current grade derived from service state and route id
  readonly grade = computed<Grade | undefined>(() =>
    this.gradeService.grades().find(g => g.id === this.gradeId())
  );
  // Connect to service loading state
  readonly loading;

  constructor(
    private route: ActivatedRoute,
    private gradeService: GradeService
  ) {
    this.loading = this.gradeService.loading;
    this.paramMapSignal = toSignal(this.route.paramMap, {
      initialValue: this.route.snapshot.paramMap
    });
  }

  /**
   * Called when component initializes
   * Ensures grades are loaded
   */
  ngOnInit(): void {
    // Load grades if they haven't been loaded yet
    if (this.gradeService.grades().length === 0) {
      this.gradeService.loadGrades();
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

