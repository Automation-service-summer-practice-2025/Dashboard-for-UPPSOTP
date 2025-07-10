import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ScatterUploadDialogComponent } from './scatter-upload-dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scatter-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './scatter-upload.html',
  styleUrls: ['./scatter-upload.css']
})
export class ScatterUploadComponent {
  @Output() fileLoaded = new EventEmitter<{data: any, title: string}>();
  @Input() isLocked: boolean = false;
  
  constructor(private dialog: MatDialog) {}

  openUploadDialog() {
    if (this.isLocked) return;

    const dialogRef = this.dialog.open(ScatterUploadDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.parseFile(result.file, result.title, result.xAxis, result.yAxis);
      }
    });
  }

  private parseFile(file: File, title: string, xAxis: string, yAxis: string) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const chartData = this.parseCSV(content, xAxis, yAxis);
      this.fileLoaded.emit({
        data: chartData, 
        title
      });
    };
    reader.readAsText(file);
  }

  private parseCSV(csv: string, xAxis: string, yAxis: string): any {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());
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
        pointRadius: 3,
        pointHoverRadius: 5
      }]
    };
  }
}