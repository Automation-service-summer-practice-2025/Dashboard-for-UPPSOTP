export interface DashboardItem {
  id: number;
  cols: number;
  rows: number;
  y: number;
  x: number;
  content: string;
  type?: 'text' | 'image' | 'chart'; // Добавляем тип элемента
  chartType?: 'bar' | 'pie' | 'line' | 'scatter'; // Тип графика
  data?: any; // Данные для графика
  file?: File | null; // Загруженный файл
  title?: string;
}