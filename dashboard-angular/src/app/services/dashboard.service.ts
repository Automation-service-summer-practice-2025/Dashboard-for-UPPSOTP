import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DashboardItem {
  id: number;
  cols: number;
  rows: number;
  y: number;
  x: number;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardItems = new BehaviorSubject<DashboardItem[]>([]);
  dashboardItems$ = this.dashboardItems.asObservable();
  private itemIdCounter = 0;

  private lockStatus = new BehaviorSubject<boolean>(false);
  lockStatus$ = this.lockStatus.asObservable();

  constructor() {}

  addTextBlock() {
    const newItem: DashboardItem = {
      id: this.getNextId(),
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
      content: 'Текстовый блок'
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
