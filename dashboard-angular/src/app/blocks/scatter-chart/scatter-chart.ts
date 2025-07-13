import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ScatterUploadComponent } from './scatter-upload';
import { ScatterChartItem } from '../../models/dashboard-item.model';

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
export class ScatterChart implements OnInit {
  @Input() item!: ScatterChartItem;
  @Input() isLocked: boolean = false;

  showEditor = false;
  chartOptions: ChartOptions = {};

  ngOnInit(): void {
    this.updateChartOptions();
  }

  onDataLoaded(event: {data: any, title: string}) {
    this.item.data = event.data;
    this.item.title = event.title;
    this.updateChartOptions();
  }

  toggleEditor() {
    this.showEditor = !this.showEditor;
  }

  applyChanges(editorData: any) {
    this.item.title = editorData.title;
    this.item.lineColor = editorData.lineColor;
    this.item.lineWidth = editorData.lineWidth;
    this.item.showGrid = editorData.showGrid;
    this.item.showLegend = editorData.showLegend;
    this.updateChartOptions();
    this.showEditor = false;
  }

  private updateChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: { 
            display: true, 
            text: this.item.data?.datasets?.[0]?.label?.split(' по ')[1] || 'X Axis' 
          },
          grid: { display: this.item.showGrid }
        },
        y: {
          title: { 
            display: true, 
            text: this.item.data?.datasets?.[0]?.label?.split(' по ')[0] || 'Y Axis' 
          },
          beginAtZero: false,
          grid: { display: this.item.showGrid }
        }
      },
      plugins: {
        legend: { display: this.item.showLegend }
      }
    };

    if (this.item.data?.datasets?.length) {
      this.item.data.datasets[0].borderColor = this.item.lineColor;
      this.item.data.datasets[0].borderWidth = this.item.lineWidth;
      this.item.data = {...this.item.data};
    }
  }
}
