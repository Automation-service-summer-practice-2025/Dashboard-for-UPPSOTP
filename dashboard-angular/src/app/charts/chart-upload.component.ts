import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ChartUploadDialogComponent } from './chart-upload-dialog.component'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chart-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, FormsModule, MatIconModule],
  template: `
    <div class="upload-placeholder">
      <button mat-raised-button color="primary" (click)="openUploadDialog()">
        <mat-icon>upload</mat-icon>
        Загрузить данные
      </button>
    </div>
  `,
  styles: [`
    .chart-upload {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  `]
})
export class ChartUploadComponent {
  @Output() fileLoaded = new EventEmitter<{data: any, title: string}>();
  
  constructor(private dialog: MatDialog) {}

  openUploadDialog() {
    const dialogRef = this.dialog.open(ChartUploadDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.parseFile(result.file, result.title);
      }
    });
  }

  private parseFile(file: File, title: string) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const chartData = this.parseCSV(content);
      this.fileLoaded.emit({data: chartData, title});
    };
    reader.readAsText(file);
  }

  private parseCSV(csv: string): any {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());
    const datasets = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      datasets.push({
        data: values.slice(1).map(Number),
        label: values[0].trim()
      });
    }
    
    return {
      labels: headers.slice(1),
      datasets: datasets
    };
  }
}