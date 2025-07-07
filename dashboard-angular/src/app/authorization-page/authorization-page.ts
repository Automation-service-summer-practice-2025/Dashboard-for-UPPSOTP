import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-authorization-page',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './authorization-page.html',
  styleUrl: './authorization-page.css'
})
export class AuthorizationPage {
  constructor(private router: Router) { }

  login() {
    this.router.navigate(['admin']);
  }

  logout() {
    this.router.navigate(['']);
  }
}
