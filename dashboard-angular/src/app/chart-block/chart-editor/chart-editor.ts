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
  templateUrl: './chart-editor.html',
  styleUrls: ['./chart-editor.css']
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