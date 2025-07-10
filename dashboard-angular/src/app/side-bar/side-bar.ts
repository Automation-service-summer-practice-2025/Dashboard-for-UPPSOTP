import { Component, Output, EventEmitter, HostListener } from '@angular/core';
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
  width = 300;
  private resizing = false;
  private lastDownX = 0;

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
  
  onResizeStart(event: MouseEvent) {
    this.resizing = true;
    this.lastDownX = event.clientX;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onResizeMove(event: MouseEvent) {
    if (!this.resizing) {
      return;
    }
    const dx = event.clientX - this.lastDownX;
    this.width = Math.min(Math.max(this.width + dx, 200), 600);
    this.lastDownX = event.clientX;
  }

  @HostListener('document:mouseup')
  onResizeEnd() {
    this.resizing = false;
  }
}
