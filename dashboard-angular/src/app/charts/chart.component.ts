import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartUploadComponent } from './chart-upload.component';
import { ChartOptions } from 'chart.js';

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
        <app-chart-upload (fileLoaded)="onDataLoaded($event)"></app-chart-upload>
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
  @Input() chartType: 'bar' = 'bar';
  title: string = '';

  @Input() data: any = null;

constructor() {}
  
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  onDataLoaded(event: {data: any, title: string}) {
    this.data = event.data;
    this.title = event.title;
  }

  ngOnChanges(changes: SimpleChanges) {
  console.log('Data changed:', changes['data'].currentValue);
}
}