import { Component, Input, Output, EventEmitter } from '@angular/core';
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
}
