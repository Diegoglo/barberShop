import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../../core/service/register.service'; // Importa el servicio

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null; // Para mostrar mensajes de error

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService, // Inyecta el servicio
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      password: ['', Validators.required] 
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value) // Usa el servicio
        .subscribe(
          response => {
            console.log('Registro exitoso', response);
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Error en el registro', error);
            this.errorMessage = 'Error al registrar el usuario. Intenta nuevamente más tarde.';
          }
        );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
    }
  }
}
