import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { Header } from '../header/header';
import { TextBlock } from '../blocks/text-block/text-block';
import { ChartComponent } from '../charts/chart.component';

export interface DashboardItem extends GridsterItem {
  title: string;
  content: string;
  id: number;
  isEditingTitle?: boolean;
  isEditingContent?: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, GridsterModule, FormsModule, TextBlock, ChartComponent, Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  options: GridsterConfig = {};
  dashboard: any[] = [];
  isLocked = false;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.lockStatus$.subscribe(isLocked => {
      this.isLocked = isLocked;
      this.toggleDragResize();
    });
  }

  ngOnInit(): void {
    this.options = {
      gridType: 'fixed',
      compactType: 'none',
      margin: 5,
      minCols: 10,
      maxCols: 320,
      minRows: 10,
      maxRows: 5000,
      minItemCols: 5,
      minItemRows: 5,
      minItemArea: 25,
      fixedColWidth: 40,
      fixedRowHeight: 40,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      displayGrid: 'none',
    };

    this.dashboardService.dashboardItems$.subscribe(items => {
      this.dashboard = items;
    });
  }

  removeItem(item: DashboardItem): void {
    if (this.isLocked) return;

    const index = this.dashboard.findIndex(d => d.id === item.id);
    if (index !== -1) {
      this.dashboard.splice(index, 1);
    }
  }

  toggleDragResize(): void {
    if (this.options.draggable && this.options.resizable) {
      this.options.draggable.enabled = !this.isLocked;
      this.options.resizable.enabled = !this.isLocked;
      this.options.api?.optionsChanged?.();
    }
  }
}
