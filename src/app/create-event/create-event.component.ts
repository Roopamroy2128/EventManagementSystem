import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import {
  MatNativeDateModule
} from '@angular/material/core';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  MatButtonModule
} from '@angular/material/button';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  eventForm;

  categories = ['Virtual', 'Onsite']; // Must match backend validation

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: [''],
      category: ['', Validators.required],
      maxAttendees: [100, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const payload = {
        title: this.eventForm.value.title,
        description: this.eventForm.value.description,
        startTime: this.eventForm.value.startTime,
        endTime: this.eventForm.value.endTime,
        location: this.eventForm.value.location,
        category: this.eventForm.value.category,
        maxAttendees: this.eventForm.value.maxAttendees
      };

      this.eventService.createEvent(payload).subscribe({
        next: (res) => {
          alert('Event created successfully!');
          this.router.navigate(['/admin-home']); // Navigate as needed
        },
        error: (err) => {
          console.error('Error creating event:', err);
          alert('Failed to create event.');
        }
      });
    } else {
      this.eventForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.eventForm.reset();
  }
}