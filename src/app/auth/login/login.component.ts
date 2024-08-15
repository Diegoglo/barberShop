import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error de autenticación', error);
        alert('Credenciales inválidas.');
      }
    );
  }
}
