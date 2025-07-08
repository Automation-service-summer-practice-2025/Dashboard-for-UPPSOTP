import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { HistogramUploadDialogComponent } from './histogram-upload-dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-histogram-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template:``,
  styles: ''
})
export class HistogramUploadComponent {
  @Output() fileLoaded = new EventEmitter<{data: any, title: string}>();
  @Input() isLocked: boolean = false;
  
  constructor(private dialog: MatDialog) {}

  openUploadDialog() {
    if (this.isLocked) return;

    const dialogRef = this.dialog.open(HistogramUploadDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.parseFile(result.file, result.title, result.column);
      }
    });
  }

  private parseFile(file: File, title: string, column: string) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const chartData = this.parseCSV(content, column);
      this.fileLoaded.emit({
        data: chartData, 
        title
      });
    };
    reader.readAsText(file);
  }

  private parseCSV(csv: string, column: string): any {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());
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
        borderWidth: 1,
        barPercentage: 0.9,
        categoryPercentage: 0.9
      }]
    };
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