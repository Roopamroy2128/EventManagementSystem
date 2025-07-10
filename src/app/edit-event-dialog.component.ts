import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, DateAdapter, NativeDateAdapter } from '@angular/material/core';

import { EventService } from './services/event.service'; // ✅ adjust path as needed


@Component({
  selector: 'app-edit-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.css']
})
export class EditEventDialogComponent {
  eventForm: FormGroup;
  categories = ['Onsite', 'Virtual'];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService, // ✅ Inject the service
    public dialogRef: MatDialogRef<EditEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.eventForm = this.fb.group({
      eventId: [data.eventId],
      title: [data.title, Validators.required],
      startTime: [new Date(data.startTime)],
      endTime: [new Date(data.endTime)],
      category: [data.category || ''],
      description: [data.description],
      location: [data.location],
      maxAttendees: [data.maxAttendees || 100]
    });
  }

  onSubmit() {
  if (this.eventForm.valid) {
    const updatedEvent = {
  ...this.eventForm.value,
  eventId: this.eventForm.get('eventId')?.value // ✅ Always get from the form
};

    console.log('Submitting:', updatedEvent); // ✅ Confirm eventId is correct

    this.eventService.updateEvent(updatedEvent).subscribe({
      next: (res) => {
        console.log('Event updated:', res);
        this.dialogRef.close(true); // return success to parent
      },
      error: (err) => {
        console.error('Update failed:', err);
        // optionally show error message
      }
    });
  }
}


  onCancel() {
    this.dialogRef.close();
  }
}
