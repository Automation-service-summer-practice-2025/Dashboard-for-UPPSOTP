import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-histogram-upload-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './histogram-upload-dialog.html',
  styleUrls: ['./histogram-upload-dialog.css']
})
export class HistogramUploadDialogComponent {
  title = 'Новый график';
  selectedFile: File | null = null;
  headers: string[] = [];
  selectedColumn: string = '';

  constructor(private dialogRef: MatDialogRef<HistogramUploadDialogComponent>) {}

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
        if (this.headers.length > 0) {
          this.selectedColumn = this.headers[0];
        }
      }
    };
    reader.readAsText(file);
  }

  onUpload() {
    if (this.selectedFile && this.selectedColumn) {
      this.dialogRef.close({
        title: this.title,
        file: this.selectedFile,
        column: this.selectedColumn
      });
    }
  }
}