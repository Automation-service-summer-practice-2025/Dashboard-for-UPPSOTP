import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashboardItem, DashboardItemRegistry } from '../models/dashboard-item.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardItems = new BehaviorSubject<DashboardItem[]>([]);
  dashboardItems$ = this.dashboardItems.asObservable();
  private itemIdCounter = 0;

  private lockStatus = new BehaviorSubject<boolean>(false);
  lockStatus$ = this.lockStatus.asObservable();

  constructor() {}

  addBlock(type: string) {
    const ItemClass = DashboardItemRegistry[type];
    if (ItemClass) {
      const newItem = new ItemClass();
      newItem.id = ++this.itemIdCounter;
      this.dashboardItems.next([...this.dashboardItems.value, newItem]);
    } else {
      console.error(`Unknown dashboard item type: ${type}`);
    }
  }

  toggleLock(isLocked: boolean) {
    this.lockStatus.next(isLocked);
  }

  isLocked(): boolean {
    return this.lockStatus.value;
  }
}
