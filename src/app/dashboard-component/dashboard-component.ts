import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardStats, UpcomingEvent } from '../interfaces/dashboard';

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

    ngOnInit() {
        // Initialize dashboard data
        this.dashboardData = {
            totalCourses: 5,
            currentGPA: 3.75,
            attendanceRate: 95,
            recentActivities: [],
            currentSemester: 'Fall 2023',
            totalCredits: 15,
            upcomingAssignments: 0,
            activeCourses: 0
    }
}
}