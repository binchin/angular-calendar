import { Component, inject, Input } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { MonthNamePipe } from '../../pipes/month-name.pipe';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [MonthNamePipe],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.scss',
})
export class CalendarHeaderComponent {
  @Input() currentMonth!: number;
  @Input() currentYear!: number;
  calendarService = inject(CalendarService);

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.calendarService.onDateChange(this.currentMonth, this.currentYear);
  }
  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.calendarService.onDateChange(this.currentMonth, this.currentYear);
  }
}
