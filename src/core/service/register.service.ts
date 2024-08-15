import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

// interface RegisterData {
//   name: string;
//   email: string;
//   age: number;
//   gender: string;
// }

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/api/register';

  constructor(private http: HttpClient) { }

  register(data: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
