import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  // standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  currentUrl: string = '';

  constructor (private router: Router) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
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
}
