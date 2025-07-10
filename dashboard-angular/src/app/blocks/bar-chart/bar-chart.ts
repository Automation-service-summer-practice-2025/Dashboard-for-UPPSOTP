import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BarUpload } from './bar-upload';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    CommonModule, 
    BaseChartDirective, 
    BarUpload, 
    MatIconModule, 
    FormsModule, 
    MatInputModule, 
  ],
  templateUrl: './bar-chart.html',
  styleUrls: ['./bar-chart.css']
})
export class BarChart {
  @Input() data: any = null;
  @Input() isLocked: boolean = false;
  title: string = '';
  showEditor = false;
  
  editorWidth = 300;
  isResizing = false;

  barColor = '#4bc0c0';
  barWidth = 1;
  showGrid = true;
  showLegend = true;

  chartOptions: ChartOptions = {
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
    this.barColor = editorData.lineColor;
    this.barWidth = editorData.lineWidth;
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
      this.data.datasets[0].borderColor = this.barColor;
      this.data.datasets[0].backgroundColor = this.barColor.replace('1)', '0.2)');
      this.data.datasets[0].borderWidth = this.barWidth;
      this.data = {...this.data};
    }
  }
}
