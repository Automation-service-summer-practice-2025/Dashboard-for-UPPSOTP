import { Component } from '@angular/core';
import {SideBar} from '../side-bar/side-bar'
import { Dashboard } from "../dashboard/dashboard";
import { Header } from '../header/header';

@Component({
  selector: 'app-home-page',
  imports: [
    SideBar,
    Dashboard,
    Header
],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
