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
      gridType: 'fit',
      compactType: 'none',
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      useBodyForBreakpoint: false,
      minCols: 1,
      maxCols: 12,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 2,
      defaultItemRows: 2,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        stop: undefined,
        start: undefined
      },
      resizable: {
        enabled: true,
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        },
        stop: undefined,
        start: undefined
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: 'onDrag&Resize',
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
  }

  private loadInitialItems(): void {
    this.dashboard = [
      {
        id: this.getNextId(),
        cols: 2,
        rows: 2,
        y: 0,
        x: 0,
        title: 'Виджет 1',
        content: 'Содержимое первого виджета. Вы можете перетаскивать и изменять размер этого элемента.'
      },
      {
        id: this.getNextId(),
        cols: 2,
        rows: 3,
        y: 0,
        x: 2,
        title: 'Виджет 2',
        content: 'Второй виджет с большей высотой. Попробуйте изменить его размер или переместить.'
      },
      {
        id: this.getNextId(),
        cols: 3,
        rows: 2,
        y: 2,
        x: 0,
        title: 'Широкий виджет',
        content: 'Этот виджет занимает больше места по ширине. Отлично подходит для графиков и диаграмм.'
      },
      {
        id: this.getNextId(),
        cols: 1,
        rows: 1,
        y: 3,
        x: 3,
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
      cols: 2,
      rows: 2,
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
