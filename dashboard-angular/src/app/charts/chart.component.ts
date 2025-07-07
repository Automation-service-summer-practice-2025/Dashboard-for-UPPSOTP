import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartUploadComponent } from './chart-upload.component';
import { ChartOptions, TooltipItem } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ChartEditorComponent } from './chart-editor.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, ChartUploadComponent, MatIconModule, FormsModule, MatInputModule, ChartEditorComponent],
  template: `
    <div class="chart-container">
      <div class="chart-header">
        <h3>{{title}}</h3>
        <button 
          mat-icon-button 
          class="edit-btn" 
          (click)="showEditor = !showEditor"
          *ngIf="!isLocked">
          <mat-icon>edit</mat-icon>
        </button>
      </div>
      
      <app-chart-editor
        [opened]="showEditor"
        [title]="title"
        [lineColor]="lineColor"
        [lineWidth]="lineWidth"
        [showGrid]="showGrid"
        [showLegend]="showLegend"
        (close)="showEditor = false"
        (apply)="applyChanges($event)">
        
        <div class="chart-content">
          <div class="chart-wrapper" *ngIf="data; else uploadTemplate">
            <canvas baseChart
              [data]="data"
              [options]="chartOptions"
              [type]="chartType === 'bar' ? 'bar' : 'scatter'">
            </canvas>
          </div>
          <ng-template #uploadTemplate>
            <app-chart-upload 
              (fileLoaded)="onDataLoaded($event)" 
              [isLocked]="isLocked">
            </app-chart-upload>
          </ng-template>
        </div>
      </app-chart-editor>
    </div>
  `,
  styles: [`
    .chart-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
    }
    
    .chart-content {
      flex: 1;
      padding: 8px;
    }
    
    .chart-wrapper {
      height: 100%;
      position: relative;
    }
    
    .edit-btn {
      margin-left: 8px;
    }
    
    h3 {
      margin: 0;
      font-size: 16px;
    }
  `]
})


export class ChartComponent {
  @Input() chartType: string = '';
  @Input() data: any = null;
  @Input() isLocked: boolean = false;
  title: string = 'Новый график';
  showEditor = false;
  
  editorWidth = 300;
  isResizing = false;

  lineColor = '#4bc0c0';
  lineWidth = 3;
  showGrid = true;
  showLegend = true;

  constructor() {}
  
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: { display: true, text: 'X Axis' }
      },
      y: {
        title: { display: true, text: 'Y Axis' },
        beginAtZero: false
      }
    },
    plugins: {
      legend: { display: true }
    }
  };

  onDataLoaded(event: {data: any, title: string, chartType: 'scatter' | 'bar'}) {
    this.data = event.data;
    this.title = event.title;
    
    if (event.chartType === 'bar') {
      this.chartOptions = {
        ...this.chartOptions,
        scales: {
          x: {
            ...this.chartOptions.scales?.['x'],
            type: 'category',
            title: { display: true, text: 'Значения' }
          },
          y: {
            ...this.chartOptions.scales?.['y'],
            title: { display: true, text: 'Частота' },
            beginAtZero: true
          }
        }
      };
    } else {
      this.chartOptions = {
        ...this.chartOptions,
        scales: {
          x: {
            ...this.chartOptions.scales?.['x'],
            title: { display: true, text: event.data.datasets[0].label.split(' по ')[1] || 'X Axis' }
          },
          y: {
            ...this.chartOptions.scales?.['y'],
            title: { display: true, text: event.data.datasets[0].label.split(' по ')[0] || 'Y Axis' },
            beginAtZero: false
          }
        }
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Data changed:', changes['data'].currentValue);
  }

  toggleEditor() {
    this.showEditor = !this.showEditor;
  }

  startResize(event: MouseEvent) {
    this.isResizing = true;
    const startX = event.clientX;
    const startWidth = this.editorWidth;
    
    const doResize = (moveEvent: MouseEvent) => {
      this.editorWidth = startWidth + (startX - moveEvent.clientX);
    };
    
    const stopResize = () => {
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
      this.isResizing = false;
    };
    
    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
  }

  applyChanges(editorData: any) {
    this.title = editorData.title;
    this.lineColor = editorData.lineColor;
    this.lineWidth = editorData.lineWidth;
    this.showGrid = editorData.showGrid;
    this.showLegend = editorData.showLegend;
    this.updateChartOptions();
    this.showEditor = false;
  }

  private updateChartOptions() {
    this.chartOptions = {
      ...this.chartOptions,
      scales: {
        x: {
          ...this.chartOptions.scales?.['x'],
          grid: { display: this.showGrid }
        },
        y: {
          ...this.chartOptions.scales?.['y'],
          grid: { display: this.showGrid }
        }
      },
      plugins: {
        legend: { display: this.showLegend }
      }
    };
    
    if (this.data?.datasets?.length) {
      this.data.datasets[0].borderColor = this.lineColor;
      this.data.datasets[0].borderWidth = this.lineWidth;
      this.data = {...this.data};
    }
  }
}
