import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentService} from '../../../core/service/appointment.service';
import { AuthService} from '../../../core/service/auth.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  selectedDate: string = '';
  selectedTime: string = '';
  today: string = ''; // Agrega esta propiedad
  currentTime: string = ''; // Agrega esta propiedad

  constructor(private route: ActivatedRoute, private appointmentService: AppointmentService, private authService:AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedDate = params['date'] || '';
      this.selectedTime = params['time'] || '';
    });

    this.today = this.getTodayDate(); // Inicializa today
    this.currentTime = this.getCurrentTime(); // Inicializa currentTime
  }

  private getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Devuelve la fecha en formato YYYY-MM-DD
  }

  private getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().split(' ')[0].substring(0, 5); // Devuelve la hora en formato HH:MM
  }

  sendDateTimeToBackend(): void {
    this.appointmentService.sendDateTime(this.selectedDate, this.selectedTime).subscribe(
      response => {
        console.log('Datos enviados correctamente:', response);
        alert('Hora agendada.');
      },
      error => {
        console.error('Error al enviar los datos:', error);
      }
    );
  }
  // Método para manejar el clic en "Ver horarios disponibles"
  checkAuthentication() {
    const boleana= this.authService.getToken();
    console.log(boleana);
    if (!this.authService.isAuthenticated()) {
      alert('Por favor, regístrate para acceder a los horarios disponibles.');
      this.router.navigate(['/login']); // Redirige a la página de registro
    } else {
      this.router.navigate(['/schedule-table']); // Si está autenticado, redirige a la tabla de horarios
    }
  }
}
