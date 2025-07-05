import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { Header } from '../header/header';

export interface DashboardItem extends GridsterItem {
  title: string;
  content: string;
  id: number;
  isEditingTitle?: boolean;
  isEditingContent?: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, GridsterModule, FormsModule, Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  options: GridsterConfig = {};
  dashboard: any[] = [];
  isLocked = false;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.lockStatus$.subscribe(isLocked => {
      console.log('Lock status changed:', isLocked);
      this.isLocked = isLocked;
      this.toggleDragResize();
    });
  }

  @ViewChild('titleInput') titleInputRef: ElementRef | undefined;
  @ViewChild('contentInput') contentInputRef: ElementRef | undefined;

  ngOnInit(): void {
    this.initializeGridster();
    this.dashboardService.dashboardItems$.subscribe(items => {
      this.dashboard = items;
    });
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

  removeItem(item: DashboardItem): void {
    if (this.isLocked) return;

    const index = this.dashboard.findIndex(d => d.id === item.id);
    if (index !== -1) {
      this.dashboard.splice(index, 1);

      const previewEl = document.querySelector('gridster-preview');
      if (previewEl && previewEl.parentNode) {
        previewEl.parentNode.removeChild(previewEl);
      }
    }
  }

  toggleDragResize(): void {
    if (this.options.draggable && this.options.resizable) {
      this.options.draggable.enabled = !this.options.draggable.enabled;
      this.options.resizable.enabled = !this.options.resizable.enabled;

      this.options.draggable.enabled = !this.isLocked;
      this.options.resizable.enabled = !this.isLocked;

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
}
