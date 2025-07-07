import { Component } from '@angular/core';
import {SideBar} from '../side-bar/side-bar'
import { Dashboard } from "../dashboard/dashboard";

@Component({
  selector: 'app-home-page',
  imports: [
    SideBar,
    Dashboard,
],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
