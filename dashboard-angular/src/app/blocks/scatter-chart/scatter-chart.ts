import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ScatterUploadComponent } from './scatter-upload';

@Component({
  selector: 'app-scatter-chart',
  standalone: true,
  imports: [
    CommonModule, 
    BaseChartDirective, 
    ScatterUploadComponent, 
    MatIconModule, 
    FormsModule, 
    MatInputModule, 
  ],
  templateUrl: './scatter-chart.html',
  styleUrls: ['./scatter-chart.css']
})
export class ScatterChartComponent {
  @Input() data: any = null;
  @Input() isLocked: boolean = false;
  title: string = '';
  showEditor = false;
  
  editorWidth = 300;
  isResizing = false;

  lineColor = '#4bc0c0';
  lineWidth = 3;
  showGrid = true;
  showLegend = true;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: { display: true, text: 'X Axis' },
        grid: { display: this.showGrid }
      },
      y: {
        title: { display: true, text: 'Y Axis' },
        beginAtZero: false,
        grid: { display: this.showGrid }
      }
    },
    plugins: {
      legend: { display: this.showLegend }
    }
  };

  onDataLoaded(event: {data: any, title: string}) {
    this.data = event.data;
    this.title = event.title;
    this.updateChartOptions();
  }

  toggleEditor() {
    this.showEditor = !this.showEditor;
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
          title: { 
            display: true, 
            text: this.data?.datasets?.[0]?.label?.split(' по ')[1] || 'X Axis' 
          },
          grid: { display: this.showGrid }
        },
        y: {
          ...this.chartOptions.scales?.['y'],
          title: { 
            display: true, 
            text: this.data?.datasets?.[0]?.label?.split(' по ')[0] || 'Y Axis' 
          },
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
