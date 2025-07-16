import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { DashboardItem, TextItem, BarItem, ScatterItem, ChartOptions} from '../models/dashboard-item.model'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-side-bar',
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-side-bar.html',
  styleUrl: './edit-side-bar.css'
})
export class EditSideBar {
  @Input() isOpen = false;
  @Input() currentItem: DashboardItem | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<DashboardItem>();
  width = 300;
  private resizing = false;
  private lastDownX = 0;

    // Обновление любого свойства элемента
  updateProperty(property: string, value: any): void {
    if (this.currentItem) {
      (this.currentItem as any)[property] = value;
    }
  }

  updateChartOptions(property: keyof ChartOptions, value: any): void {
    if (this.currentItem && this.isChartItem()) {
      // Создаем новый объект chartOptions (или используем существующий)
      const newOptions = {
        ...(this.currentItem as BarItem).chartOptions,
        [property]: value
      };
      // Обновляем currentItem
      (this.currentItem as BarItem)= {
        ...this.currentItem,
        chartOptions: newOptions
      };
    }
  }

  getContent(): string {
    return this.isTextItem() ? (this.currentItem as TextItem).content || '' : '';
  }

  getColorChart(): string {
    if (!this.isChartItem()) return '#4bc07eff';
    return (this.currentItem as BarItem).chartOptions?.color || '#4bc07eff';
  }

  getLineWidthChart(): number {
    return this.isChartItem() ? (this.currentItem as BarItem).chartOptions?.lineWidth || 3 : 1;
  }
  
  getShowGridChart(): boolean {
    return this.isChartItem() ? (this.currentItem as BarItem).chartOptions?.showGrid || true: false;
  }

  getShowLegendChart(): boolean {
    return this.isChartItem() ? (this.currentItem as BarItem).chartOptions?.showLegend || true: false;
  }

  isTextItem(): boolean {
    return this.currentItem?.type === 'text';
  }

  isImageItem(): boolean {
    return this.currentItem?.type === 'image';
  }

  isChartItem(): boolean {
    return this.currentItem?.type === 'bar-chart';
  }

  close() {
    this.closed.emit();
  }

  save() {
    if (this.currentItem) {
      this.saved.emit(this.currentItem);
    }
    this.close();
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
    const dx = this.lastDownX - event.clientX;
    this.width = Math.min(Math.max(this.width + dx, 200), 600);
    this.lastDownX = event.clientX;
  }

  @HostListener('document:mouseup')
  onResizeEnd() {
    this.resizing = false;
  }
}
