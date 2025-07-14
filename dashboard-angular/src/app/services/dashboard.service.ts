import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GridsterConfig } from 'angular-gridster2';
import { DashboardItem, DashboardItemRegistry } from '../models/dashboard-item.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private gridsterOptions: GridsterConfig | null = null;

  private dashboardItems = new BehaviorSubject<DashboardItem[]>([]);
  dashboardItems$ = this.dashboardItems.asObservable();
  private itemIdCounter = 0;

  private lockStatus = new BehaviorSubject<boolean>(false);
  lockStatus$ = this.lockStatus.asObservable();

  constructor() {}

  setGridsterOptions(options: GridsterConfig) {
    this.gridsterOptions = options;
  }

  addBlock(type: string) {
    const ItemClass = DashboardItemRegistry[type];
    if (ItemClass) {
      const newItem = new ItemClass();
      newItem.id = ++this.itemIdCounter;

      if (this.gridsterOptions?.api?.getFirstPossiblePosition) {
        const position = this.gridsterOptions.api.getFirstPossiblePosition(newItem);
        newItem.x = position.x;
        newItem.y = position.y;
      }
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
