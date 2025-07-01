import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DashboardItem {
  id: number;
  cols: number;
  rows: number;
  y: number;
  x: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardItems = new BehaviorSubject<DashboardItem[]>([]);
  dashboardItems$ = this.dashboardItems.asObservable();
  private itemIdCounter = 0;

  constructor() {}

  addTextBlock(title: string = 'Текстовый блок', content: string = '') {
    const newItem: DashboardItem = {
      id: this.getNextId(),
      cols: 10,
      rows: 10,
      y: 0,
      x: 0,
      title: title,
      content: content || `Это новый текстовый блок #${this.itemIdCounter}`
    };
    this.dashboardItems.next([...this.dashboardItems.value, newItem]);
  }

  private getNextId(): number {
    return ++this.itemIdCounter;
  }
}