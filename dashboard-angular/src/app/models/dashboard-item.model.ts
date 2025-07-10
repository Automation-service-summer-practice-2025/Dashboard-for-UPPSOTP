export interface DashboardItem {
  id: number;
  type: string;
  x: number;
  y: number;
  rows: number;
  cols: number;
}

export interface HasTitle {
    title?: string;
}

export interface ChartItem extends DashboardItem {
    chartType: string;
    data?: any;
    file?: File | null;
}
  
export class ImageItem implements DashboardItem {
    id: number = 0;
    type: string = 'image';
    x: number = 0;
    y: number = 0;
    rows: number = 5;
    cols: number = 5;
    file?: File | null;
}

export class TextItem implements DashboardItem {
    id: number = 0;
    type: string = 'text';
    x: number = 0;
    y: number = 0;
    rows: number = 5;
    cols: number = 5;
    content: string = 'Текстовый блок';
}

export class ScatterItem implements ChartItem, HasTitle {
    id: number = 0;
    type: string = 'chart';
    x: number = 0;
    y: number = 0;
    rows: number = 7;
    cols: number = 17;
    chartType: string = 'scatter';
    data?: any;
    file?: File | null;
    title?: string;
}

export class HistogramItem implements ChartItem, HasTitle {
    id: number = 0;
    type: string = 'chart';
    x: number = 0;
    y: number = 0;
    rows: number = 7;
    cols: number = 17;
    chartType: string = 'histogram';
    data?: any;
    file?: File | null;
    title?: string;
}

