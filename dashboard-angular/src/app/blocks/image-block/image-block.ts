import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-block',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-block.html',
  styleUrl: './image-block.css'
})
export class ImageBlock {
  @Input() item: any;
  @Input() isLocked: boolean = false;
  @Output() onRemove = new EventEmitter<any>();

  imageSrc: string | null = null;

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    if (this.isLocked) return;

    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') === 0) {
        const blob = items[i].getAsFile();
        if (blob && blob.size <= 50 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = () => {
            this.imageSrc = reader.result as string;
          };
          reader.readAsDataURL(blob);
        } else {
          alert("Файл слишком большой или недопустимый формат.");
        }
        event.preventDefault();
        break;
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file && file.size <= 50 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Файл слишком большой или недопустимый формат.");
    }
  }

  focusContainer() {
    const container = document.querySelector('.upload-container');
    (container as HTMLElement)?.focus();
  }
}
