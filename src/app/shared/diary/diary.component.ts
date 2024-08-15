import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

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
}
