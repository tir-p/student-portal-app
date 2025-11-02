import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardStats, UpcomingEvent } from '../interfaces/dashboard';
import { StudentService } from '../services/student-service';
import { CourseService } from '../services/course-service';
import { AttendanceService } from '../services/attendance-service';
import { GradeService } from '../services/grade-service';

/**
 * Dashboard Component
 * Displays overview statistics for the student
 * Shows total courses, GPA, attendance rate, and other key metrics
 * All data is calculated from real services - no hardcoded values
 */
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
    // Dashboard data that will be displayed to the user
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
        private courseService: CourseService,
        private attendanceService: AttendanceService,
        private gradeService: GradeService
    ) {}

    /**
     * Called when component initializes
     * Loads student and course data, then calculates dashboard statistics
     */
    ngOnInit() {
        // Load student profile data
        this.studentService.loadStudentProfile('1');
        // Load all courses
        this.courseService.loadCourses();
        // Load attendance records
        this.attendanceService.loadAttendance();
        // Load grades
        this.gradeService.loadGrades();

        // Wait for data to load (simulating API delay), then update dashboard
        setTimeout(() => {
            this.updateDashboardData();
        }, 1200);
    }

    /**
     * Updates dashboard data with current student and course information
     * Uses real data from all services
     */
    private updateDashboardData(): void {
        const courses = this.courseService.courses();
        const activeCourses = this.courseService.activeCourses();
        const totalCredits = this.courseService.totalCredits();
        
        // Get real attendance rate from attendance service
        const attendanceRate = Math.round(this.attendanceService.overallAttendance() * 10) / 10;
        
        // Get real GPA from grade service
        const currentGPA = this.gradeService.currentGPA() || 0;
        
        // Get current semester from active courses (most common semester)
        const currentSemester = this.getCurrentSemester(activeCourses);
        
        // Get upcoming assignments count from grades
        const upcomingAssignments = this.getUpcomingAssignmentsCount();
        
        // Get recent activities from grades (recently graded assignments)
        const recentActivities = this.getRecentActivities();
        
        // Update all dashboard statistics with real data
        this.dashboardData = {
            totalCourses: courses.length,
            currentGPA: currentGPA,
            attendanceRate: attendanceRate || 0,
            recentActivities: recentActivities || [],
            currentSemester: currentSemester || '',
            totalCredits: totalCredits || 0,
            upcomingAssignments: upcomingAssignments || 0,
            activeCourses: activeCourses.length
        };
    }

    /**
     * Gets the current semester from active courses
     * Returns the most common semester among active courses
     * @param activeCourses - Array of active courses
     * @returns Formatted semester string (e.g., "Fall 2024")
     */
    private getCurrentSemester(activeCourses: any[]): string {
        if (activeCourses.length === 0) return '';
        
        // Count semesters
        const semesterCount: Record<string, number> = {};
        for (const course of activeCourses) {
            const sem = course.semester || '';
            semesterCount[sem] = (semesterCount[sem] || 0) + 1;
        }
        
        // Find most common semester
        let mostCommon = '';
        let maxCount = 0;
        for (const [sem, count] of Object.entries(semesterCount)) {
            if (count > maxCount) {
                maxCount = count;
                mostCommon = sem;
            }
        }
        
        // Format semester using the pipe logic
        if (mostCommon) {
            const parts = mostCommon.split('-');
            if (parts.length === 2) {
                const [term, year] = parts;
                const termMap: Record<string, string> = {
                    'spring': 'Spring',
                    'summer': 'Summer',
                    'fall': 'Fall',
                    'winter': 'Winter'
                };
                return `${termMap[term.toLowerCase()] || term} ${year}`;
            }
        }
        
        return '';
    }

    /**
     * Counts upcoming assignments from all grades
     * An assignment is "upcoming" if it's pending and due date is in the future
     * @returns Number of upcoming assignments
     */
    private getUpcomingAssignmentsCount(): number {
        const allGrades = this.gradeService.grades();
        const now = new Date();
        let count = 0;
        
        for (const grade of allGrades) {
            if (grade && grade.assignments) {
                for (const assignment of grade.assignments) {
                    // Check if assignment is pending and due date is in the future
                    if (assignment.status === 'pending' && assignment.dueDate) {
                        const dueDate = new Date(assignment.dueDate);
                        if (dueDate > now) {
                            count++;
                        }
                    }
                }
            }
        }
        
        return count;
    }

    /**
     * Gets recent activities from grades
     * Shows recently graded assignments as activities
     * @returns Array of recent activities
     */
    private getRecentActivities(): any[] {
        const allGrades = this.gradeService.grades();
        const activities: any[] = [];
        const now = new Date();
        
        // Get all graded assignments from the last 30 days
        for (const grade of allGrades) {
            if (grade && grade.assignments) {
                for (const assignment of grade.assignments) {
                    if (assignment.status === 'graded' && assignment.submittedDate) {
                        const submittedDate = new Date(assignment.submittedDate);
                        const daysDiff = (now.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24);
                        
                        // Include assignments graded in the last 30 days
                        if (daysDiff <= 30 && daysDiff >= 0) {
                            activities.push({
                                id: assignment.id,
                                title: `${assignment.name} - ${grade.courseCode}`,
                                date: submittedDate,
                                type: 'assignment',
                                courseCode: grade.courseCode,
                                description: `Scored ${assignment.earnedScore}/${assignment.maxScore}`
                            });
                        }
                    }
                }
            }
        }
        
        // Sort by date (most recent first) and return top 5
        return activities
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 5);
    }
}