import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardItem } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class BackendAPIService {
  private url = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getDashboardItems(): Observable<DashboardItem[]> {
    return this.http.get<DashboardItem[]>(`${this.url}/dashboard-items`);
  }

  createDashboardItem(item: DashboardItem): Observable<DashboardItem> {
    return this.http.post<DashboardItem>(`${this.url}/dashboard-items`, item);
  }
}