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
  template: `
    <h2 mat-dialog-title>Загрузка данных для графика</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Название графика</mat-label>
        <input matInput [(ngModel)]="title">
      </mat-form-field>

      <mat-radio-group [(ngModel)]="chartType" class="chart-type-group">
        <mat-radio-button value="xy">График X-Y</mat-radio-button>
        <mat-radio-button value="distribution">Распределение</mat-radio-button>
      </mat-radio-group>

      <div *ngIf="chartType === 'xy'">
        <mat-form-field appearance="outline" class="w-full" *ngIf="headers.length > 0">
          <mat-label>Ось X</mat-label>
          <mat-select [(ngModel)]="selectedXAxis">
            <mat-option *ngFor="let header of headers" [value]="header">
              {{header}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="w-full" *ngIf="headers.length > 0">
          <mat-label>Ось Y</mat-label>
          <mat-select [(ngModel)]="selectedYAxis">
            <mat-option *ngFor="let header of headers" [value]="header">
              {{header}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div *ngIf="chartType === 'distribution'">
        <mat-form-field appearance="outline" class="w-full" *ngIf="headers.length > 0">
          <mat-label>Признак для распределения</mat-label>
          <mat-select [(ngModel)]="selectedColumn">
            <mat-option *ngFor="let header of headers" [value]="header">
              {{header}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    
      <input type="file" #fileInput accept=".csv" (change)="onFileSelected($event)" hidden>
      <button mat-raised-button color="primary" (click)="fileInput.click()">
        <mat-icon>attach_file</mat-icon>
        Выбрать CSV файл
      </button>
      
      <div *ngIf="selectedFile" class="file-info">
        <div>Выбран файл: {{selectedFile.name}}</div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Отмена</button>
      <button mat-raised-button color="primary" [disabled]="!selectedFile || !selectedXAxis || !selectedYAxis" (click)="onUpload()">
        Загрузить
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .w-full { 
      width: 100%;
      margin-top: 16px;
    }
    .file-info { 
      margin-top: 16px; 
      color: #666;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    mat-dialog-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .chart-type-group {
      display: flex;
      gap: 16px;
      margin: 16px 0;
    }
    .mat-radio-button {
      margin-right: 16px;
    }
  `]
})
export class ChartUploadDialogComponent {
  title = 'Новый график';
  selectedFile: File | null = null;
  headers: string[] = [];
  selectedXAxis: string = '';
  selectedYAxis: string = '';
  selectedColumn: string = '';
  chartType: 'xy' | 'distribution' = 'xy';

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
        chartType: this.chartType // Добавляем тип графика в результат
      });
    }
  }
}