import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageItem } from '../../models/dashboard-item.model';

@Component({
  selector: 'app-image-block',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-block.html',
  styleUrl: './image-block.css'
})
export class ImageBlock {
  @Input() item!: ImageItem;
  @Input() isLocked: boolean = false;

  get imageUrl(): string | null {
    return this.item.file ? URL.createObjectURL(this.item.file) : null;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    if (this.isLocked) return;

    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image')) {
        const file = item.getAsFile();
        if (file) {
          this.item.file = file;
        } else {
          alert("Недопустимый формат.");
        }
        event.preventDefault();
        break;
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.item.file = file;
    } else {
      alert("Недопустимый формат.");
    }
  }

  focusContainer() {
    const container = document.querySelector('.upload-container');
    (container as HTMLElement)?.focus();
  }
}
