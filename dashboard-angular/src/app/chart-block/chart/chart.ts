import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartUploadComponent } from '../chart-upload/chart-upload';
import { ChartOptions } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ChartEditorComponent } from '../chart-editor/chart-editor';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, ChartUploadComponent, MatIconModule, FormsModule, MatInputModule, ChartEditorComponent],
  templateUrl: './chart.html',
  styleUrls: ['./chart.css'] 
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
    this.chartType = event.chartType;
    
    if (event.chartType === 'bar') {
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category',
            title: { display: true, text: 'Значения' },
            grid: { display: this.showGrid }
          },
          y: {
            title: { display: true, text: 'Частота' },
            beginAtZero: true,
            grid: { display: this.showGrid }
          }
        },
        plugins: {
          legend: { display: this.showLegend }
        }
      };
    } else {
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            title: { 
              display: true, 
              text: event.data.datasets[0].label.split(' по ')[1] || 'X Axis' 
            },
            grid: { display: this.showGrid }
          },
          y: {
            title: { 
              display: true, 
              text: event.data.datasets[0].label.split(' по ')[0] || 'Y Axis' 
            },
            beginAtZero: false,
            grid: { display: this.showGrid }
          }
        },
        plugins: {
          legend: { display: this.showLegend }
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
