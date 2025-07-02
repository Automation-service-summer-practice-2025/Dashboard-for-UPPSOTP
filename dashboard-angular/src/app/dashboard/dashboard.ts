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
        content: 'Содержимое первого виджета.',
        isEditingTitle: false,
        isEditingContent: false,
      },
      {
        id: this.getNextId(),
        cols: 20,
        rows: 100,
        y: 0,
        x: 20,
        title: 'Виджет 2',
        content: 'Содержимое второго виджета',
        isEditingTitle: false,
        isEditingContent: false,
      },
      {
        id: this.getNextId(),
        cols: 100,
        rows: 15,
        y: 20,
        x: 0,
        title: 'Виджет 3',
        content: 'Содержимое третьего виджета',
        isEditingTitle: false,
        isEditingContent: false,
      },
      {
        id: this.getNextId(),
        cols: 50,
        rows: 50,
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
