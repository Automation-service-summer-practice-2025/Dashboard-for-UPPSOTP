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
    const newItem = new Dashboard.TextItem();
    newItem.id = this.getNextId();
    this.dashboardItems.next([...this.dashboardItems.value, newItem]);
  }

  addImageBlock() {
    const newItem = new Dashboard.ImageItem();
    newItem.id = this.getNextId();
    this.dashboardItems.next([...this.dashboardItems.value, newItem]);
  }

  addScatterChart() {
    const newItem = new Dashboard.ScatterItem();
    newItem.id = this.getNextId();
    this.dashboardItems.next([...this.dashboardItems.value, newItem]);
  }

  addBarChart() {
    const newItem = new Dashboard.BarItem();
    newItem.id = this.getNextId();
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
