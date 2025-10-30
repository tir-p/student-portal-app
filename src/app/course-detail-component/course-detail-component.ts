import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../services/course-service';
import { GradeService } from '../services/grade-service';
import { Course } from '../interfaces/course';
import { CourseCodePipe } from '../pipes/course-code-pipe-pipe';
import { CreditHoursPipe } from '../pipes/credit-hours-pipe-pipe';
import { SemesterPipe } from '../pipes/semester-pipe-pipe';
import { GradeColorPipe } from '../pipes/grade-color-pipe-pipe';
import { TimeRemainingPipe } from '../pipes/time-remaining-pipe-pipe';
import { Inject } from '@angular/core';

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
  providers: [CourseService, GradeService],
  templateUrl: './course-detail-component.html',
  styleUrls: ['./course-detail-component.scss']
})
export class CourseDetailComponent implements OnInit {
  readonly loading;
  
  course = signal<Course | undefined>(undefined);
  courseId = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    @Inject(CourseService) private courseService: CourseService,
    private gradeService: GradeService
  ) {
    this.loading = this.courseService.loading;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId.set(params['id']);
      this.loadCourseDetails();
    });
  }

  private loadCourseDetails(): void {
    this.courseService.getCourseById(this.courseId()).subscribe(course => {
      this.course.set(course);
    });
  }

  getCourseGrade() {
    return this.gradeService.getGradeByCourseId(this.courseId());
  }
}