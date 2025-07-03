import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chart-upload-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule, FormsModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Загрузка данных для графика</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Название графика</mat-label>
        <input matInput [(ngModel)]="title">
      </mat-form-field>
      
      <input type="file" #fileInput accept=".csv" (change)="onFileSelected($event)" hidden>
      <button mat-raised-button color="primary" (click)="fileInput.click()">
        <mat-icon>attach_file</mat-icon>
        Выбрать CSV файл
      </button>
      
      <div *ngIf="selectedFile" class="file-info">
        Выбран файл: {{selectedFile.name}}
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Отмена</button>
      <button mat-raised-button color="primary" [disabled]="!selectedFile" (click)="onUpload()">
        Загрузить
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .w-full { width: 100%; }
    .file-info { margin-top: 16px; color: #666; }
  `]
})
export class ChartUploadDialogComponent {
  title = 'Новый график';
  selectedFile: File | null = null;

  constructor(private dialogRef: MatDialogRef<ChartUploadDialogComponent>) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.dialogRef.close({
        title: this.title,
        file: this.selectedFile
      });
    }
  }
}