import { GridsterItem } from "angular-gridster2";
import { Editor } from "ngx-editor";

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
	override rows: number = 7;
	override cols: number = 15;
  data?: any;
	file?: File | null;
	title?: string;
  lineColor?: string = '#4bc0c0';
  lineWidth?: number = 3;
  showGrid?: boolean = true;
  showLegend?: boolean = true;
}

@DashboardBlock('text')
export class TextItem extends DashboardItem {
  override type = 'text';
  content?: string = '';
  editor?: Editor = new Editor;
}

@DashboardBlock('image')
export class ImageItem extends DashboardItem {
  override type = 'image';
	file?: File | null;
}

@DashboardBlock('scatter-chart')
export class ScatterChartItem extends ChartItem {
  override type = 'scatter-chart';
}

@DashboardBlock('bar-chart')
export class BarChartItem extends ChartItem {
  override type = 'bar-chart';
}
