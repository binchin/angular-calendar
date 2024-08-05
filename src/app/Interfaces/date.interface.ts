import { Appointment } from './appointment.interface';

export interface CalendarDate {
  day: number | string;
  dayOfWeek: number | string;
  date: Date | string;
  appointments?: Appointment;
}
