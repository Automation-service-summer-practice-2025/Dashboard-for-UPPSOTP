import { Component, Output, EventEmitter } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardService } from '../services/dashboard.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonToggleModule,
    CommonModule
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {
  isLocked = false;
  
  @Output() addScatter = new EventEmitter<void>();
  @Output() addHistogram = new EventEmitter<void>();

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.lockStatus$.subscribe(isLocked => {
      this.isLocked = isLocked;
    });
  }

  addTextBlock() {
    if (!this.isLocked) {
      this.dashboardService.addTextBlock();
    }
  }

  addImageBlock() {
    if (!this.isLocked) {
      this.dashboardService.addImageBlock();
    }
  }

  addScatterChart() {
    if (!this.isLocked) {
      this.dashboardService.addScatterChart();
    }
  }

  addHistogramChart() {
    if (!this.isLocked) {
      this.dashboardService.addBarChart();
    }
  }

  toggleLock() {
    this.dashboardService.toggleLock(this.isLocked);
  }

  onToggleMode(event: any) {
    this.isLocked = event.value === 'locked';
    this.dashboardService.toggleLock(this.isLocked);
  }
}