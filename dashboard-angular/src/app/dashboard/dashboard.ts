import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';
import { FormsModule } from '@angular/forms';

export interface DashboardItem extends GridsterItem {
  title: string;
  content: string;
  id: number;
  isEditingTitle?: boolean;
  isEditingContent?: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, GridsterModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  options: GridsterConfig = {};
  dashboard: DashboardItem[] = [];
  private itemIdCounter = 0;

  @ViewChild('titleInput') titleInputRef: ElementRef | undefined;
  @ViewChild('contentInput') contentInputRef: ElementRef | undefined;

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
      minCols: 100,
      // maxCols: 12,
      minRows: 100,
      // maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 10,
      defaultItemRows: 10,
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
      displayGrid: 'none',
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
  }

  private loadInitialItems(): void {
    this.dashboard = [
      {
        id: this.getNextId(),
        cols: 30,
        rows: 20,
        y: 10,
        x: 10,
        title: 'Виджет 1',
        content: 'Содержимое первого виджета.',
        isEditingTitle: false,
        isEditingContent: false,
      },
      {
        id: this.getNextId(),
        cols: 30,
        rows: 30,
        y: 0,
        x: 20,
        title: 'Виджет 2',
        content: 'Содержимое второго виджета',
        isEditingTitle: false,
        isEditingContent: false,
      },
      {
        id: this.getNextId(),
        cols: 30,
        rows: 40,
        y: 20,
        x: 0,
        title: 'Виджет 3',
        content: 'Содержимое третьего виджета',
        isEditingTitle: false,
        isEditingContent: false,
      },
      {
        id: this.getNextId(),
        cols: 40,
        rows: 20,
        y: 30,
        x: 30,
        title: 'Виджет 4',
        content: 'Содержимое четвертого виджета',
        isEditingTitle: false,
        isEditingContent: false,
      }
    ];
  }

  private getNextId(): number {
    return ++this.itemIdCounter;
  }

  addItem(): void {
    const newItem: DashboardItem = {
      id: this.getNextId(),
      cols: 20,
      rows: 20,
      y: 0,
      x: 0,
      title: `Новый виджет ${this.itemIdCounter}`,
      content: `Содержимое нового виджета №${this.itemIdCounter}.`,
      isEditingTitle: false,
      isEditingContent: false,
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

      if (!this.options.draggable.enabled) {
        this.dashboard.forEach(item => {
          item.isEditingTitle = false;
          item.isEditingContent = false;
        });
      }
      this.options.api?.optionsChanged?.();
    }
  }

  toggleEditMode(item: DashboardItem, field: 'title' | 'content', value: boolean): void {
    if (value) {
      this.dashboard.forEach(dItem => {
        if (dItem.id !== item.id) {
          dItem.isEditingTitle = false;
          dItem.isEditingContent = false;
        }
      });
    }

    if (field === 'title') {
      item.isEditingTitle = value;
      if (value) {
        item.isEditingContent = false;
        setTimeout(() => {
          if (this.titleInputRef) {
            const inputElement = this.titleInputRef.nativeElement;
            inputElement.focus();
            inputElement.setSelectionRange(
              inputElement.value.length,
              inputElement.value.length
            );
          }
        }, 0);
      }
    } else if (field === 'content') {
      item.isEditingContent = value;
      if (value) {
        item.isEditingTitle = false;
        setTimeout(() => {
          if (this.contentInputRef) {
            const textareaElement = this.contentInputRef.nativeElement;
            textareaElement.focus();
            textareaElement.setSelectionRange(
              textareaElement.value.length,
              textareaElement.value.length
            );
          }
        }, 0);
      }
    }
  }

  trackByFn(index: number, item: DashboardItem): number {
    return item.id;
  }
}
