import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DashboardItem {
  id: number;
  cols: number;
  rows: number;
  y: number;
  x: number;
  content: string;
  type?: 'text' | 'image' | 'chart';
  chartType?: 'bar' | 'pie' | 'line' | 'scatter';
  data?: any;
  file?: File | null;
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

  private zoomLevel = new BehaviorSubject<number>(100);
  zoomLevel$ = this.zoomLevel.asObservable();
  private readonly minZoom = 50;
  private readonly maxZoom = 200;
  private readonly zoomStep = 10;

  constructor() {}

  // Методы для работы с элементами дашборда
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
      cols: 17,
      rows: 7,
      y: 0,
      x: 0,
      title: '',
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

  // Методы для блокировки/разблокировки
  toggleLock(isLocked: boolean) {
    this.lockStatus.next(isLocked);
  }

  isLocked(): boolean {
    return this.lockStatus.value;
  }

  setZoom(level: number): void {
    const newLevel = Math.max(this.minZoom, Math.min(this.maxZoom, level));
    this.zoomLevel.next(newLevel);
  }

  zoomIn(): void {
    this.setZoom(this.zoomLevel.value + this.zoomStep);
  }

  zoomOut(): void {
    this.setZoom(this.zoomLevel.value - this.zoomStep);
  }

  resetZoom(): void {
    this.setZoom(100);
  }

  getCurrentZoom(): number {
    return this.zoomLevel.value;
  }

  // Вспомогательные методы
  private getNextId(): number {
    return ++this.itemIdCounter;
  }
}