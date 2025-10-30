import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../navbar-component/navbar-component';
import { SidebarComponent } from '../../sidebar-component/sidebar-component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  template: `
    <div class="layout">
      <app-navbar></app-navbar>
      <div class="content-wrapper">
        <app-sidebar></app-sidebar>
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .content-wrapper {
      display: flex;
      flex: 1;
    }
    .main-content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
  `]
})
export class MainLayoutComponent {}