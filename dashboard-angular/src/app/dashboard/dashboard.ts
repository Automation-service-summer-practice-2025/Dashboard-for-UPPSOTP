import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';

export interface DashboardItem extends GridsterItem {
  title: string;
  content: string;
  id: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, GridsterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
   title = 'angular-gridster-demo';

  options: GridsterConfig = {};
  dashboard: DashboardItem[] = [];
  private itemIdCounter = 0;

  ngOnInit(): void {
    this.initializeGridster();
    this.loadInitialItems();
  }

  private initializeGridster(): void {
    this.options = {
      gridType: 'fixed',
      compactType: 'none',
      margin: 5,
      minCols: 10,
      maxCols: 320,
      minRows: 10,
      maxRows: 5000,
      maxItemCols: 1000,
      minItemCols: 10,
      maxItemRows: 1000,
      minItemRows: 10,
      maxItemArea: 18000,
      minItemArea: 25,
      fixedColWidth: 1,
      fixedRowHeight: 1,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false, // Разрешить ли менять местами элементы при перетаскивании.
      pushItems: true, //Разрешить ли "выталкивание" других элементов при перетаскивании.
      displayGrid: 'none', // Показывать ли сетку
    };
  }

  private loadInitialItems(): void {
    this.dashboard = [
      {
        id: this.getNextId(),
        cols: 10,
        rows: 10,
        y: 10,
        x: 10,
        title: 'Виджет 1',
        content: 'Содержимое первого виджета. Вы можете перетаскивать и изменять размер этого элемента.'
      },
      {
        id: this.getNextId(),
        cols: 20,
        rows: 100,
        y: 0,
        x: 20,
        title: 'Виджет 2',
        content: 'Второй виджет с большей высотой. Попробуйте изменить его размер или переместить.'
      },
      {
        id: this.getNextId(),
        cols: 100,
        rows: 15,
        y: 20,
        x: 0,
        title: 'Широкий виджет',
        content: 'Этот виджет занимает больше места по ширине. Отлично подходит для графиков и диаграмм.'
      },
      {
        id: this.getNextId(),
        cols: 50,
        rows: 50,
        y: 30,
        x: 30,
        title: 'Мини',
        content: 'Компактный виджет'
      }
    ];
  }

  private getNextId(): number {
    return ++this.itemIdCounter;
  }

  addItem(): void {
    const newItem: DashboardItem = {
      id: this.getNextId(),
      cols: 10,
      rows: 15,
      y: 0,
      x: 0,
      title: `Новый виджет ${this.itemIdCounter}`,
      content: `Содержимое нового виджета №${this.itemIdCounter}. Создан ${new Date().toLocaleTimeString()}.`
    };

    this.dashboard.push(newItem);
  }

  removeItem(item: DashboardItem): void {
    const index = this.dashboard.findIndex(d => d.id === item.id);
    if (index !== -1) {
      this.dashboard.splice(index, 1);
    }
  }

  toggleDragResize(): void {
    if (this.options.draggable && this.options.resizable) {
      this.options.draggable.enabled = !this.options.draggable.enabled;
      this.options.resizable.enabled = !this.options.resizable.enabled;
      this.options.api?.optionsChanged?.();
    }
  }

  trackByFn(index: number, item: DashboardItem): number {
    return item.id;
  }
}
