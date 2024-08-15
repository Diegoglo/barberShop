import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from '../../../core/service/schedule.service'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  schedule: { [key: string]: { [key: string]: boolean } } = {};
  dates: { [key: string]: string } = {}; // Para almacenar las fechas correspondientes a cada día de la semana

  constructor(private scheduleService: ScheduleService, private router: Router) { }

  ngOnInit(): void {
    // Inicializa la disponibilidad de la agenda y calcula las fechas
    this.initializeSchedule();
    this.calculateDates();
  }

  initializeSchedule() {
    this.days.forEach(day => {
      this.schedule[day] = {};
      this.hours.forEach(hour => {
        this.schedule[day][hour] = Math.random() > 0.5; // Ejemplo: aleatoriamente disponible o no
      });
    });
  }

  calculateDates() {
    const today = new Date();
    const startOfWeek = this.getStartOfWeek(today);

    this.days.forEach((day, index) => {
      const dayOfWeek = (index + 1) % 7; // Ajusta según el índice de los días en el array
      const targetDate = new Date(startOfWeek);
      targetDate.setDate(targetDate.getDate() + dayOfWeek);

      this.dates[day] = this.formatDate(targetDate);
    });
  }

  getStartOfWeek(date: Date): Date {
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1); // Ajusta para que la semana comience en lunes
    return startOfWeek;
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses en JavaScript son 0-indexados
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  selectTime(day: string, hour: string) {
    const selectedDate = this.dates[day];
    this.scheduleService.setSelectedDateTime(selectedDate, hour);
    this.router.navigate(['/diary'], { queryParams: { date: selectedDate, time: hour } });
  }
}
