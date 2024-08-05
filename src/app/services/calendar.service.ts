import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface DateInfo {
  month: number;
  year: number;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private currentDate = new Date();
  private dateSubject = new BehaviorSubject<DateInfo>({
    month: this.currentDate.getMonth(),
    year: this.currentDate.getFullYear(),
  });
  date$: Observable<DateInfo> = this.dateSubject.asObservable();

  constructor() {}

  onDateChange(month: number, year: number): void {
    this.dateSubject.next({ month, year });
  }
}
