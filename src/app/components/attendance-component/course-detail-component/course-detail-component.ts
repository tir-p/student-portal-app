import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/course-service';
import { GradeService } from '../../../services/grade-service';
import { Course } from '../../../interfaces/course';
import { CourseCodePipe } from '../../../pipes/course-code-pipe-pipe';
import { CreditHoursPipe } from '../../../pipes/credit-hours-pipe-pipe';
import { SemesterPipe } from '../../../pipes/semester-pipe-pipe';
import { GradeColorPipe } from '../../../pipes/grade-color-pipe-pipe';
import { TimeRemainingPipe } from '../../../pipes/time-remaining-pipe-pipe';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Course Detail Component
 * Displays detailed information about a specific course
 * Shows course info, schedule, instructor, and student's grade for the course
 */
@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CourseCodePipe,
    CreditHoursPipe,
    SemesterPipe,
    GradeColorPipe,
    TimeRemainingPipe
  ],
  templateUrl: './course-detail-component.html',
  styleUrls: ['./course-detail-component.scss']
})
export class CourseDetailComponent implements OnInit {
  // Connect to service loading state
  readonly loading;

  // Route paramMap as a signal; avoids direct Observable usage
  private paramMapSignal;

  // Course ID derived from route paramMap (converted to number)
  readonly courseId = computed<number>(() => {
    const id = this.paramMapSignal().get('id');
    return id ? Number(id) : 0;
  });

  // Current course derived from service state and route id
  readonly course = computed<Course | undefined>(() =>
    this.courseService.courses().find(c => c.id === this.courseId())
  );

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private gradeService: GradeService
  ) {
    this.loading = this.courseService.loading;
    this.paramMapSignal = toSignal(this.route.paramMap, {
      initialValue: this.route.snapshot.paramMap
    });
  }

  /**
   * Called when component initializes
   * Ensures courses are loaded
   */
  ngOnInit(): void {
    if (this.courseService.courses().length === 0) {
      this.courseService.loadCourses();
    }
  }

  /**
   * Gets the grade for this course
   * @returns Grade object for the current course, or undefined if not found
   */
  getCourseGrade() {
    return this.gradeService.getGradeByCourseId(this.courseId());
  }
}