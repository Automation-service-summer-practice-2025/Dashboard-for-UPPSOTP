import { GridsterItem } from "angular-gridster2";

export abstract class DashboardItem implements GridsterItem {
  id: number = 0;
  abstract type: string;
  x: number = 0;
  y: number = 0;
  rows: number = 5;
  cols: number = 5;
}

export const DashboardItemRegistry: { [key: string]: new () => DashboardItem } = {};

export function registerDashboardItem(type: string, ctor: new () => DashboardItem): void {
  DashboardItemRegistry[type] = ctor;
}

export function DashboardBlock(type: string) {
  return function <T extends new (...args: any[]) => DashboardItem>(constructor: T) {
    registerDashboardItem(type, constructor);
  };
}

export interface HasTitle {
	title?: string;
}

export abstract class ChartItem extends DashboardItem implements HasTitle {
	data?: any;
	file?: File | null;
	title?: string;
	override rows: number = 7;
	override cols: number = 15;
}

@DashboardBlock('text')
export class TextItem extends DashboardItem {
  override type = 'text';
  content: string = 'Текстовый блок';
}

@DashboardBlock('image')
export class ImageItem extends DashboardItem {
  override type = 'image';
	file?: File | null;
}

@DashboardBlock('scatter-chart')
export class ScatterItem extends ChartItem {
  override type = 'scatter-chart';
}

@DashboardBlock('bar-chart')
export class BarItem extends ChartItem {
  override type = 'bar-chart';
}
