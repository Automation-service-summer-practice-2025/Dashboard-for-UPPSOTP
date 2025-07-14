import { Editor } from "ngx-editor";

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
    editor: Editor = new Editor;
}

export class ScatterItem implements ChartItem, HasTitle {
    id: number = 0;
    type: string = 'scatter-chart';
    x: number = 0;
    y: number = 0;
    rows: number = 7;
    cols: number = 17;
    data?: any;
    file?: File | null;
    title?: string;
}

export class BarItem implements ChartItem, HasTitle {
    id: number = 0;
    type: string = 'bar-chart';
    x: number = 0;
    y: number = 0;
    rows: number = 7;
    cols: number = 17;
    data?: any;
    file?: File | null;
    title?: string;
}

