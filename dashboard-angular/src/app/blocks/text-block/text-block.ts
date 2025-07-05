import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-block',
  imports: [CommonModule, FormsModule],
  templateUrl: './text-block.html',
  styleUrl: './text-block.css'
})
export class TextBlock {
  @Input() item: any;
  @Input() isLocked: boolean = false;
  @Output() onRemove = new EventEmitter<any>();
}
