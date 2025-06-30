import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-side-bar',
  imports: [
    MatSidenavModule, 
    MatButtonModule, 
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {

}
