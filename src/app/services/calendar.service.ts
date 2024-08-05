import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  currentDate = new Date();
  private dateSubject = new BehaviorSubject<any>({
    month: this.currentDate.getMonth(),
    year: this.currentDate.getFullYear(),
  });
  date$ = this.dateSubject.asObservable();
  constructor() {}

  onDateChange(month: number, year: number): void {
    this.dateSubject.next({ month, year });
  }
}
