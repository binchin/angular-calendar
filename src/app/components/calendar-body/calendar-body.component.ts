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

  openAppointmentForm(calendarDate: CalendarDate): void {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: { calendarDate },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const selectedDate = this.calendarDates.filter(
          (date) => date.date === result.date.date
        );
        Object.assign(selectedDate[0], { appointments: result });
      }
    });
  }

  drop(event: CdkDragDrop<CalendarDate[]>) {
    const droppedElement = event.item.element.nativeElement as HTMLElement;
    console.log(droppedElement);
    const droppedFromTarget = event.container.element
      .nativeElement as HTMLElement;
    console.log(droppedFromTarget);
    const target = event.event.target as HTMLElement;
    const droppedTo = +target.innerText;
    const droppedFrom = +droppedFromTarget.childNodes[0].textContent!.trim();
    console.log(droppedFrom);
    console.log(droppedTo);

    if (droppedTo > 0) {
      this.calendarDates.forEach((date) => {
        if (date.day === droppedTo) {
          Object.assign(date, {
            appointments: {
              title: droppedElement.childNodes[0].textContent!.trim(),
            },
          });
        }
        if (date.day === droppedFrom && droppedFrom != droppedTo) {
          Object.assign(date, {
            appointments: { title: '' },
          });
        }
      });
    }
  }

  deleteAppointment(calendarDate: CalendarDate): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { calendarDate },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const selectedDate = this.calendarDates.filter(
          (date) => date.date === result.calendarDate.date
        );
        delete selectedDate[0].appointments;
      }
    });
  }
}
