import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    FormsModule
  ],
  template: `
    <mat-sidenav-container class="editor-container">
      <mat-sidenav 
        #editorSidenav
        mode="side"
        position="end"
        [fixedInViewport]="true"
        [style.width.px]="width"
        [opened]="opened"
        class="editor-sidenav">
        
        <div class="editor-content">
          <div class="editor-header">
            <h3>Настройки графика</h3>
            <button mat-icon-button (click)="close.emit()">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          
          <mat-form-field>
            <mat-label>Заголовок</mat-label>
            <input matInput [(ngModel)]="title">
          </mat-form-field>
          
          <mat-form-field>
            <mat-label>Цвет линии</mat-label>
            <input type="color" matInput [(ngModel)]="lineColor">
          </mat-form-field>
          
          <mat-slider min="1" max="10" step="1" [(ngModel)]="lineWidth">
            <mat-label>Толщина линии</mat-label>
          </mat-slider>
          
          <mat-checkbox [(ngModel)]="showGrid">Сетка</mat-checkbox>
          <mat-checkbox [(ngModel)]="showLegend">Легенда</mat-checkbox>
          
          <button mat-raised-button color="primary" (click)="applyChanges()">
            Применить
          </button>
        </div>
        <div class="resize-handle" (mousedown)="startResize($event)"></div>
      </mat-sidenav>
      
      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .editor-container {
      position: relative;
      height: 100%;
      width: 100%;
    }
    
    .editor-sidenav {
      background: white;
      box-shadow: -2px 0 10px rgba(0,0,0,0.1);
      padding: 16px;
      position: relative;
    }
    
    .editor-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      height: 100%;
    }
    
    .editor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .editor-header h3 {
      margin: 0;
    }
    
    .resize-handle {
      position: absolute;
      top: 0;
      left: -5px;
      width: 10px;
      height: 100%;
      cursor: col-resize;
      z-index: 100;
    }
  `]
})
export class ChartEditorComponent {
  @Input() opened = false;
  @Input() width = 300;
  @Input() title = '';
  @Input() lineColor = '#4bc0c0';
  @Input() lineWidth = 3;
  @Input() showGrid = true;
  @Input() showLegend = true;
  
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();

  private isResizing = false;
  private startX = 0;
  private startWidth = 0;

  applyChanges() {
    this.apply.emit({
      title: this.title,
      lineColor: this.lineColor,
      lineWidth: this.lineWidth,
      showGrid: this.showGrid,
      showLegend: this.showLegend
    });
  }

  startResize(event: MouseEvent) {
    this.isResizing = true;
    this.startX = event.clientX;
    this.startWidth = this.width;
    
    const doResize = (moveEvent: MouseEvent) => {
      if (this.isResizing) {
        const deltaX = this.startX - moveEvent.clientX;
        this.width = this.startWidth + deltaX;
      }
    };

    const stopResize = () => {
      this.isResizing = false;
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
    };

    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
    event.preventDefault();
  }
}