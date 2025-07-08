import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ChartUploadDialogComponent } from '../chart-upload-dialog/chart-upload-dialog.component'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chart-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, FormsModule, MatIconModule],
  templateUrl: './chart-upload.html',
  styleUrls: ['./chart-upload.css']
})
export class ChartUploadComponent {
  @Output() fileLoaded = new EventEmitter<{data: any, title: string, chartType: 'scatter' | 'bar'}>();
  @Input() isLocked: boolean = false;
  
  constructor(private dialog: MatDialog) {}

  openUploadDialog() {
    if (this.isLocked) return;

    const dialogRef = this.dialog.open(ChartUploadDialogComponent, {
      width: '500px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.parseFile(
          result.file, 
          result.title, 
          result.xAxis, 
          result.yAxis,
          result.column, 
          result.chartType
        );
      }
    });
  }

  private parseFile(file: File, title: string, xAxis: string, yAxis: string, column: string, chartType: 'scatter' | 'bar') {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const chartData = this.parseCSV(content, xAxis, yAxis, column, chartType);
      this.fileLoaded.emit({
        data: chartData, 
        title,
        chartType
      });
    };
    reader.readAsText(file);
  }

  private parseCSV(csv: string, xAxis: string, yAxis: string, column: string, chartType: 'scatter' | 'bar'): any {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());

    if (chartType === 'bar') {
      const colIndex = headers.indexOf(column);
      if (colIndex === -1) return null;

      const values = lines.slice(1)
        .map(line => parseFloat(line.split(',')[colIndex]))
        .filter(val => !isNaN(val));

      const histogramData = this.createHistogramData(values);

      return {
        labels: histogramData.map(d => d.x.toFixed(2)),
        datasets: [{
          label: `Распределение ${column}`,
          data: histogramData.map(d => d.y),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 1,
          barPercentage: 0.9,
          categoryPercentage: 0.9
        }]
      };
    } else {
      // Оригинальная логика для XY графика
      const xIndex = headers.indexOf(xAxis);
      const yIndex = headers.indexOf(yAxis);
      
      if (xIndex === -1 || yIndex === -1) return null;

      const dataPoints = lines.slice(1)
        .map(line => {
          const values = line.split(',');
          return {
            x: parseFloat(values[xIndex]),
            y: parseFloat(values[yIndex])
          };
        })
        .filter(point => !isNaN(point.x) && !isNaN(point.y));

      return {
        datasets: [{
          label: `${yAxis} по ${xAxis}`,
          data: dataPoints,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
          pointRadius: 3,
          pointHoverRadius: 5
        }]
      };
    }
  }

  private createHistogramData(values: number[], bins = 20): {x: number, y: number}[] {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binSize = (max - min) / bins;
    
    const histogram = new Array(bins).fill(0);
    
    values.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binSize), bins - 1);
      histogram[binIndex]++;
    });

    return histogram.map((count, i) => ({
      x: min + (i * binSize) + (binSize / 2),
      y: count
    }));
  }
}
