import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  private baseUrl = 'http://localhost:3000/api'; // URL base de tu backend

  constructor(private http: HttpClient) { }

  // Método para enviar la fecha y hora al backend
  sendDateTime(date: string, time: string): Observable<any> {
    const url = `${this.baseUrl}/appointment`; // Endpoint del backend
    const data = { date, time }; // Datos a enviar

    return this.http.post<any>(url, data); // Realiza la solicitud POST
  }
}
