import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  currentUrl: string = '';
  isLocked = false;

  constructor (private router: Router, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });

    if (this.currentUrl === '/') {
      this.dashboardService.toggleLock(true);
    }
  }

  isAdminPage(): boolean {
    return this.currentUrl === '/admin';
  }

  isHomePage(): boolean {
    return this.currentUrl === '/';
  }

  redirect() {
    if (this.isAdminPage()) this.router.navigate(['/']);
    if (this.isHomePage()) this.router.navigate(['/authorization']);
  }

  save() {
    console.log('Данные сохранены!');
  }
}
