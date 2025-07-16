import { Component, EventEmitter, Input, Output, HostListener, OnInit, OnDestroy } from '@angular/core';
import {
  DashboardItem,
  TextItem
 } from '../models/dashboard-item.model'
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
import { NgxEditorMenuComponent, Editor, Toolbar } from 'ngx-editor';

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
    NgxEditorMenuComponent,
  ],
  templateUrl: './edit-side-bar.html',
  styleUrl: './edit-side-bar.css'
})

export class EditSideBar {
  @Input() isOpen: boolean = false;
  @Input() currentItem: DashboardItem | null = null;
  @Output() closed = new EventEmitter<DashboardItem>();
  width = 300;
  private resizing = false;
  private lastDownX = 0;

  toolbar: Toolbar = [
    ['undo', 'redo'],
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['indent', 'outdent'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
    ['superscript', 'subscript'],
  ];

  getEditor(): Editor {
    return this.isTextItem() ? (this.currentItem as TextItem).editor : new Editor;
  }

  isTextItem(): boolean {
    return this.currentItem?.type === 'text';
  }

  isImageItem(): boolean {
    return this.currentItem?.type === 'image';
  }

  isChartItem(): boolean {
    return ['chart', 'bar-chart', 'scatter-chart'].includes(this.currentItem?.type || '');
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
