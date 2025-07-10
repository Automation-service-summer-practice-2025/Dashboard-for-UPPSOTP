import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Dashboard from '../models/dashboard-item.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardItems = new BehaviorSubject<Dashboard.DashboardItem[]>([]);
  dashboardItems$ = this.dashboardItems.asObservable();
  private itemIdCounter = 0;

  private lockStatus = new BehaviorSubject<boolean>(false);
  lockStatus$ = this.lockStatus.asObservable();

  constructor() {}

  addTextBlock() {
    const newItem: Dashboard.TextItem = {
      id: this.getNextId(),
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
      content: 'Текстовый блок',
      type: "text",
    };
    this.dashboardItems.next([...this.dashboardItems.value, newItem]);
  }

  addImageBlock() {
    const newItem: Dashboard.ImageItem = {
      id: this.getNextId(),
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
      type: 'image',
    }
    this.dashboardItems.next([...this.dashboardItems.value, newItem]);
  }

  addChart(chartType: 'bar' | 'scatter' = 'scatter') {
    const newItem: Dashboard.ScatterItem = {
      id: this.getNextId(),
      cols: 17,
      rows: 7,
      y: 0,
      x: 0,
      title: '',
      type: 'chart',
      chartType: chartType,
    };
    this.dashboardItems.next([...this.dashboardItems.value, newItem]);
  }

  toggleLock(isLocked: boolean) {
    this.lockStatus.next(isLocked);
  }

  isLocked(): boolean {
    return this.lockStatus.value;
  }

  private getNextId(): number {
    return ++this.itemIdCounter;
  }
}
