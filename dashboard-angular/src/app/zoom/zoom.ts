import { Component, HostListener, Input } from '@angular/core';
import { GridsterConfig } from 'angular-gridster2';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.html',
  styleUrl: './zoom.css',
  imports: [MatIconModule]
})

export class Zoom {
  @Input() options!: GridsterConfig;
  zoomLevel: number = 100;
  minZoom: number = 50;
  maxZoom: number = 200;
  zoomStep: number = 10;

  zoomIn(): void {
    this.zoomLevel = Math.min(this.zoomLevel + this.zoomStep, this.maxZoom);
    this.updateZoom();
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(this.zoomLevel - this.zoomStep, this.minZoom);
    this.updateZoom();
  }

  resetZoom(): void {
    this.zoomLevel = 100;
    this.updateZoom();
  }

  public updateZoom(): void {
    document.documentElement.style.setProperty('--zoom-level', this.zoomLevel.toString());
    
    if (this.options) {
      this.options.fixedColWidth = 40;
      this.options.fixedRowHeight = 40;
      
      setTimeout(() => {
        this.options.api?.resize?.();
        this.options.api?.optionsChanged?.();
      }, 100);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === '+') {
      this.zoomIn();
      event.preventDefault();
    }
    if (event.ctrlKey && event.key === '-') {
      this.zoomOut();
      event.preventDefault();
    }
  }
}
