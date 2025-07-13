import { GridsterItem } from "angular-gridster2";

export abstract class DashboardItem implements GridsterItem {
  id: number = 0;
  abstract type: string;
  x: number = 0;
  y: number = 0;
  rows: number = 5;
  cols: number = 5;
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
  
export class ImageItem extends DashboardItem {
  override type = 'image';
  file?: File | null;
}

export class TextItem extends DashboardItem {
  override type = 'text';
  content: string = 'Текстовый блок';
}

export class ScatterItem extends ChartItem {
  override type = 'scatter-chart';
}

export class BarItem extends ChartItem {
  override type = 'bar-chart';
}
