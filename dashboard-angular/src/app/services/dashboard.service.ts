import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DashboardItem {
  id: number;
  cols: number;
  rows: number;
  y: number;
  x: number;
  content: string;
  type?: 'text' | 'image' | 'chart'; // Добавляем тип элемента
  chartType?: 'bar' | 'pie' | 'line' | 'scatter'; // Тип графика
  data?: any; // Данные для графика
  file?: File | null; // Загруженный файл
  title?: string;
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
      content: 'Текстовый блок',
      type: "text",
    };
    this.dashboardItems.next([...this.dashboardItems.value, newItem]);
  }

  addImageBlock() {
    const newItem: DashboardItem = {
      id: this.getNextId(),
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
      content: '',
      type: "image"
    }

    this.dashboardItems.next([...this.dashboardItems.value, newItem]);
  }

    addChart(chartType: 'bar' | 'scatter' = 'scatter') {
    const newItem: DashboardItem = {
      id: this.getNextId(),
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
      title: 'Новый график',
      content: '',
      type: 'chart',
      chartType: chartType,
      data: null,
      file: null
    };
    this.dashboardItems.next([...this.dashboardItems.value, newItem]);
  }

  updateItem(item: DashboardItem) {
    const items = this.dashboardItems.value;
    const index = items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      items[index] = item;
      this.dashboardItems.next([...items]);
    }
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
