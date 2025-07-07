import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartUploadComponent } from './chart-upload.component';
import { ChartOptions, TooltipItem } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, ChartUploadComponent],
  template: `
    <div class="item-body">
      <h3 *ngIf="title">{{title}}</h3>
      <div class="chart-wrapper" *ngIf="data; else uploadTemplate">
        <canvas baseChart
          [data]="data"
          [options]="chartOptions"
          [type]="chartType">
        </canvas>
      </div>
      <ng-template #uploadTemplate>
        <app-chart-upload (fileLoaded)="onDataLoaded($event)" [isLocked]="isLocked"></app-chart-upload>
      </ng-template>
    </div>
  `,
  styles: [`
    .chart-container {
      padding: 16px;
      height: 100%;
      display: flex;
      flex-direction: column;
      z-index: 10
    }
    .chart-wrapper {
      flex: 1;
      position: relative;
    }
    h3 {
      margin: 0 0 16px 0;
      text-align: center;
    }
    .upload-placeholder {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f5f5;
      border: 2px dashed #ccc;
      border-radius: 8px;
    }
  `]
})


export class ChartComponent {
  @Input() chartType: 'line' = 'line';
  title: string = '';

  @Input() data: any = null;

  @Input() isLocked: boolean = false;

  constructor() {}
  
chartOptions: ChartOptions<'line'> = {
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
    legend: { display: true },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'line'>) => {
          return `${context.dataset.label}: (${context.parsed['x']}, ${context.parsed['y']})`;
        }
      }
    }
  }
};


  onDataLoaded(event: {data: any, title: string, chartType: string}) {
    this.data = event.data;
    this.title = event.title;
    
    if (event.chartType === 'distribution') {
      // Логика для графика распределения
      this.chartOptions = {
        ...this.chartOptions,
        scales: {
          ...this.chartOptions.scales,
          x: {
            ...this.chartOptions.scales?.['x'],
            title: { display: true, text: 'Значение' }
          },
          y: {
            ...this.chartOptions.scales?.['y'],
            title: { display: true, text: 'Частота' },
            beginAtZero: true // Для гистограммы лучше начинать с 0
          }
        }
      };
    } else {
      // Оригинальная логика для XY графика
      if (this.data?.datasets?.length) {
        const labelParts = this.data.datasets[0].label.split(' по ');
        if (labelParts.length === 2) {
          this.chartOptions = {
            ...this.chartOptions,
            scales: {
              ...this.chartOptions.scales,
              x: {
                ...this.chartOptions.scales?.['x'],
                title: { display: true, text: labelParts[1] }
              },
              y: {
                ...this.chartOptions.scales?.['y'],
                title: { display: true, text: labelParts[0] },
                beginAtZero: false
              }
            }
          };
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Data changed:', changes['data'].currentValue);
  }
}