import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BarUpload } from './bar-upload';
import { BarChartItem } from '../../models/dashboard-item.model';

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
export class BarChart implements OnInit{
  @Input() item!: BarChartItem;
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
          type: 'category',
          title: { display: true, text: 'Значения' },
          grid: { display: this.item.showGrid }
        },
        y: {
          title: { display: true, text: 'Частота' },
          beginAtZero: true,
          grid: { display: this.item.showGrid }
        }
      },
      plugins: {
        legend: { display: this.item.showLegend }
      }
    };
    
    if (this.item.data?.datasets?.length) {
      this.item.data.datasets[0].borderColor = this.item.lineColor;
      this.item.data.datasets[0].backgroundColor = this.item.lineColor?.replace('1)', '0.2)');
      this.item.data.datasets[0].borderWidth = this.item.lineWidth;
      this.item.data = {...this.item.data};
    }
  }
}
