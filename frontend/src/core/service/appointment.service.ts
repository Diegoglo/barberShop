import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api'; // URL del backend

  constructor(private http: HttpClient) {}

  sendDateTime(date: string, time: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointments`, { date, time });
  }
}
