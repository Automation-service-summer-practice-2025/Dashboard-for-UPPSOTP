import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chart-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="chart-upload">
      <input type="file" (change)="onFileSelected($event)" accept=".csv">
      <button mat-button (click)="loadData()">Загрузить данные</button>
    </div>
  `,
  styles: [`
    .chart-upload {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  `]
})
export class ChartUploadComponent {
  @Output() fileLoaded = new EventEmitter<any>();
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  loadData() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        this.fileLoaded.emit(this.parseCSV(content));
      };
      reader.readAsText(this.selectedFile);
    }
  }

  private parseCSV(csv: string): any {
    // Реализация парсинга CSV
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const datasets = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue;
      const values = lines[i].split(',');
      datasets.push({
        data: values.slice(1).map(Number),
        label: values[0]
      });
    }
    
    return {
      labels: headers.slice(1),
      datasets: datasets
    };
  }
}