import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardService } from '../services/dashboard.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-side-bar',
  imports: [
    MatSidenavModule, 
    MatButtonModule, 
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonToggleModule
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {
  isLocked = false;
  editMode: 'view' | 'edit' = 'edit';

  constructor(private dashboardService: DashboardService) {}

  addTextBlock() {
    this.dashboardService.addTextBlock();
  }
    
  toggleLock() {
    this.dashboardService.toggleLock(this.isLocked);
  }

  onToggleMode(event: { value: 'view' | 'edit' }) {
    this.dashboardService.toggleLock(event.value === 'view');
  }
}
