import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardStats, UpcomingEvent } from '../interfaces/dashboard';
import { StudentService } from '../services/student-service';
import { CourseService } from '../services/course-service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './dashboard-component.html',
    styleUrls: ['./dashboard-component.scss']
})
export class DashboardComponent implements OnInit {

    dashboardData: DashboardStats = {
        totalCourses: 0,
        currentGPA: 0,
        attendanceRate: 0,
        recentActivities: [],
        currentSemester: '',
        totalCredits: 0,
        upcomingAssignments: 0,
        activeCourses: 0
    };

    constructor(
        private studentService: StudentService,
        private courseService: CourseService
    ) {}

    ngOnInit() {
        // Load student profile (mocked studentId for now)
        this.studentService.loadStudentProfile('1');
        // Load courses
        this.courseService.loadCourses();

        // Wait a bit for mock data to load, then update dashboard
        setTimeout(() => {
            const student = this.studentService.student();
            const courses = this.courseService.courses();
            const activeCourses = this.courseService.activeCourses();
            const totalCredits = this.courseService.totalCredits();
            this.dashboardData = {
                totalCourses: courses.length,
                currentGPA: student?.gpa ?? 0,
                attendanceRate: 95, // TODO: Use AttendanceService
                recentActivities: [], // TODO: Populate from activity/assignment service
                currentSemester: 'Fall 2024', // TODO: Derive from course/semester data
                totalCredits: totalCredits,
                upcomingAssignments: 0, // TODO: Use GradeService/assignment data
                activeCourses: activeCourses.length
            };
        }, 700);
    }
}