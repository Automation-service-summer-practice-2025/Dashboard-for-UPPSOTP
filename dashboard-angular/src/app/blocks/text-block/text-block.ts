import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextItem } from '../../models/dashboard-item.model';

@Component({
  selector: 'app-text-block',
  imports: [CommonModule, FormsModule],
  templateUrl: './text-block.html',
  styleUrl: './text-block.css'
})
export class TextBlock {
  @Input() item!: TextItem;
  @Input() isLocked: boolean = false;
}
