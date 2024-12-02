import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:3000/api'; // URL del backend

  constructor(private http: HttpClient) {}

  getSchedule(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSchedule`);
  }

  reserveAppointment(date: string, hour: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/createAppointment`, { date, hour });
  }
  
}
