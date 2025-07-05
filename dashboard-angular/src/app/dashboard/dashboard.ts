import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { TextBlock } from '../blocks/text-block/text-block';

export interface DashboardItem extends GridsterItem {
  title: string;
  content: string;
  id: number;
  isEditingTitle?: boolean;
  isEditingContent?: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, GridsterModule, FormsModule, TextBlock],
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
      minItemCols: 5,
      minItemRows: 5,
      minItemArea: 25,
      fixedColWidth: 20,
      fixedRowHeight: 20,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      displayGrid: 'always',
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
