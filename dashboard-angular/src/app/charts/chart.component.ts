import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartUploadComponent } from './chart-upload.component';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule, ChartUploadComponent],
  template: `
    <div *ngIf="data; else uploadTemplate">
      <canvas baseChart
        [data]="data"
        [options]="chartOptions"
        [type]="chartType">
      </canvas>
    </div>
    <ng-template #uploadTemplate>
      <app-chart-upload (fileLoaded)="onDataLoaded($event)"></app-chart-upload>
    </ng-template>
  `
})
export class ChartComponent {
  @Input() chartType: string = 'bar';
  @Input() data: any = null;
  
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  onDataLoaded(data: any) {
    this.data = data;
  }
}