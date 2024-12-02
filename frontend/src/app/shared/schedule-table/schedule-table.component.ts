import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from '../../../core/service/schedule.service'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {
  days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  
  schedule: { [key: string]: { [key: string]: boolean } } = {}; // Para almacenar la disponibilidad
  dates: { [key: string]: string } = {}; // Almacena las fechas de la semana correspondientes a los días
  
  selectedDay: string | null = null;  // Día seleccionado
  selectedHour: string | null = null; // Hora seleccionada

  constructor(private scheduleService: ScheduleService, private router: Router) {}

  ngOnInit(): void {
    this.loadSchedule();   // Carga el horario
    this.calculateDates(); // Calcula las fechas de la semana
  }

  // Cargar el horario desde el servicio
  loadSchedule(): void {
    this.scheduleService.getSchedule().subscribe(
      (data) => {
        // Inicializa la variable schedule
        this.schedule = {};
  
        // Transforma la data en la estructura esperada
        data.forEach((item: any) => {
          const day = item.day; // 'Domingo', 'Lunes', etc.
          const hour = item.hour.substring(0, 5); // Extrae solo 'HH:mm'
          const available = item.available; // true o false
  
          // Asegúrate de que el día exista en el objeto schedule
          if (!this.schedule[day]) {
            this.schedule[day] = {};
          }
  
          // Asigna la disponibilidad
          this.schedule[day][hour] = available;
        });
  
        console.log('Horario cargado:', this.schedule); // Log para verificar la estructura
      },
      (error) => {
        console.error('Error al cargar el horario', error);
        alert('No se pudo cargar el horario. Intente de nuevo más tarde.');
      }
    );
  }
  
  
  

  // Calcula las fechas correspondientes a cada día de la semana
  calculateDates(): void {
    const today = new Date();
    const startOfWeek = this.getStartOfWeek(today);

    this.days.forEach((day, index) => {
      const dayOfWeek = index; // Índice del día en la semana (Lunes = 0, Domingo = 6)
      const targetDate = new Date(startOfWeek);
      targetDate.setDate(targetDate.getDate() + dayOfWeek);

      this.dates[day] = this.formatDate(targetDate);
    });
  }

  // Obtener el inicio de la semana (Lunes)
  getStartOfWeek(date: Date): Date {
    const dayOfWeek = date.getDay(); // 0 (Domingo) a 6 (Sábado)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1); // Comienza el lunes
    return startOfWeek;
  }

  // Formato de fecha 'YYYY-MM-DD'
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Seleccionar día y hora para agendar cita
  selectTime(day: string, hour: string): void {
    const selectedDate = this.dates[day]; // Fecha completa (e.g., '2024-10-03')
  
    if (this.schedule[day] && this.schedule[day][hour]) {
      if (confirm(`¿Deseas agendar la cita para las ${hour} del ${selectedDate} (${day})?`)) {
        // Enviar fecha (selectedDate) y hora al backend
        this.scheduleService.reserveAppointment(selectedDate, hour).subscribe(
          (response) => {
            alert(response.message);
            // Actualiza el estado de disponibilidad en el frontend
            this.schedule[day][hour] = false;
          },
          (error) => {
            alert(error.error?.message || 'Error al agendar la cita.');
          }
        );
      }
    } else {
      alert('La hora no está disponible.');
    }
  }
}
