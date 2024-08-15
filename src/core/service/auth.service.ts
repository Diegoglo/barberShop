import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'; // URL de tu backend
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión y almacenar el token JWT
  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/api/login`;
    return this.http.post<any>(url, { email, password });
  }

  // Almacena el token en localStorage
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Recupera el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Verifica si el usuario es administrador
  isAdminUser(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Decodifica el token (necesitarás una librería para decodificar JWT en el frontend)
    const payload = this.decodeToken(token);
    return payload?.role === 'admin';
  }

  // Decodifica el token JWT (simple implementación)
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

}
