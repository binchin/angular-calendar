import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  SimpleChanges,
} from '@angular/core';
import { CalendarDate } from '../../Interfaces/date.interface';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Appointment } from '../../Interfaces/appointment.interface';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-calendar-body',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './calendar-body.component.html',
  styleUrl: './calendar-body.component.scss',
})
export class CalendarBodyComponent {
  @Input() calendarDates: CalendarDate[] = [];
  readonly dialog = inject(MatDialog);
  public appointments: Appointment[] = [];

  openAppointmentForm(calendarDate: CalendarDate): void {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: { calendarDate },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        const selectedDate = this.calendarDates.filter(
          (date) => date.date === result.date.date
        );
        Object.assign(selectedDate[0], { appointments: result });
        console.log(selectedDate);
        console.log(this.appointments);
      }
    });
  }

  drop(event: CdkDragDrop<CalendarDate[]>) {
    const droppedElement = event.item.element.nativeElement as HTMLElement;
    const droppedFromTarget = event.container.element
      .nativeElement as HTMLElement;
    const target = event.event.target as HTMLElement;
    const droppedTo = +target.innerText;
    const droppedFrom = +droppedFromTarget.childNodes[0].textContent!.trim();
    console.log(droppedFromTarget);

    this.calendarDates.forEach((date) => {
      if (date.day === droppedTo) {
        console.log('i m here', date);
        Object.assign(date, {
          appointments: { title: droppedElement.innerText },
        });
      }
      if (date.day === droppedFrom) {
        Object.assign(date, {
          appointments: { title: '' },
        });
      }
    });
    console.log(this.calendarDates);
  }

  deleteAppointment(calendarDate: CalendarDate): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { calendarDate },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        console.log(result);
        const selectedDate = this.calendarDates.filter(
          (date) => date.date === result.calendarDate.date
        );
        delete selectedDate[0].appointments;
        console.log(selectedDate);
        console.log(this.appointments);
      }
    });
  }
}
