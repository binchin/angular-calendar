import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
  readonly dialogRef = inject(MatDialogRef<AppointmentFormComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  deleteAppointment(): void {
    this.dialogRef.close(this.data);
  }
}
