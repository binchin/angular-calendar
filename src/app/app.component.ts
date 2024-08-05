import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CalendarBodyComponent } from './components/calendar-body/calendar-body.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { CalendarService } from './services/calendar.service';
import { of } from 'rxjs';
import { CalendarDate } from './Interfaces/date.interface';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CalendarHeaderComponent,
    CalendarBodyComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  calendarService = inject(CalendarService);
  currentMonth!: number;
  currentYear!: number;
  allDatesInAMonth: CalendarDate[] = [];

  ngOnInit(): void {
    this.getAllDatesInMonth();
  }

  getAllDatesInMonth(): any {
    this.calendarService.date$.subscribe((date) => {
      this.currentMonth = date.month;
      this.currentYear = date.year;
      const daysInMonth = new Date(
        this.currentYear,
        this.currentMonth + 1,
        0
      ).getDate();
      const dates: CalendarDate[] = [];
      this.populateDatesInCalendar(dates, daysInMonth);
      this.createEmptySpaces(dates);
      this.allDatesInAMonth = dates;
    });
  }

  populateDatesInCalendar(dates: CalendarDate[], daysInMonth: number): void {
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(this.currentYear, this.currentMonth, day);
      dates.push({
        day: currentDate.getDate(),
        dayOfWeek: currentDate.getDay(),
        date: currentDate,
      });
    }
  }

  createEmptySpaces(dates: CalendarDate[]): void {
    const firstDayOfMonth = +dates[0].dayOfWeek;
    for (let day = 1; day <= firstDayOfMonth; day++) {
      dates.unshift({
        day: '',
        dayOfWeek: '',
        date: '',
      });
    }
  }
}
