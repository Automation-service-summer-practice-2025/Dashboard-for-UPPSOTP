import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-chart-upload-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    FormsModule, 
    MatIconModule,
    MatSelectModule,
    MatRadioModule
  ],
  templateUrl: './chart-upload-dialog.html',
  styleUrls: ['./chart-upload-dialog.css']
})
export class ChartUploadDialogComponent {
  title = 'Новый график';
  selectedFile: File | null = null;
  headers: string[] = [];
  selectedXAxis: string = '';
  selectedYAxis: string = '';
  selectedColumn: string = '';
  chartType: 'scatter' | 'bar' = 'scatter';

  constructor(private dialogRef: MatDialogRef<ChartUploadDialogComponent>) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.parseHeaders(this.selectedFile);
  }

  private parseHeaders(file: File | null) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split('\n').filter(line => line.trim() !== '');
      if (lines.length > 0) {
        this.headers = lines[0].split(',').map(h => h.trim());
        if (this.headers.length >= 2) {
          this.selectedXAxis = this.headers[0];
          this.selectedYAxis = this.headers[1];
        }
      }
    };
    reader.readAsText(file);
  }

  onUpload() {
    if (this.selectedFile) {
      this.dialogRef.close({
        title: this.title,
        file: this.selectedFile,
        xAxis: this.selectedXAxis,
        yAxis: this.selectedYAxis,
        column: this.selectedColumn,
        chartType: this.chartType as 'scatter' | 'bar'
      });
    }
  }
}