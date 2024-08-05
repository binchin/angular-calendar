import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Appointment } from '../../Interfaces/appointment.interface';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent {
  readonly dialogRef = inject(MatDialogRef<AppointmentFormComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  titleControl = new FormControl();
  appointmentData: Appointment = { date: '', title: '' };

  onClose(): void {
    this.dialogRef.close();
  }

  addAppointment(): void {
    this.appointmentData = {
      title: this.titleControl.value,
      date: this.data.calendarDate,
    };
    this.dialogRef.close(this.appointmentData);
  }
}
