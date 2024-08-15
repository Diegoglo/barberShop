import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private selectedDateTime = new BehaviorSubject<{ date: string, time: string } | null>(null);

  getSelectedDateTime() {
    return this.selectedDateTime.asObservable();
  }

  setSelectedDateTime(date: string, time: string) {
    this.selectedDateTime.next({ date, time });
  }
}
