import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../services/event.service'; // adjust path
import { Event } from '../services/event.service'; // adjust path
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-event-table',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule],
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css'],
})
export class EventTableComponent implements OnInit {
  searchQuery = '';
  venueFilter = '';
  //dateFilter = '';
  dateFilter: Date | null = null;

  events: Event[] = [];

  constructor(private eventService: EventService /* private router: Router*/) {}
  

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      }
    });
  }


  get venues(): string[] {
    return [...new Set(this.events.map(event => event.location))];
  }

  get uniqueDates(): string[] {
    return [...new Set(this.events.map(event => new Date(event.startTime).toLocaleDateString()))];
  }

  filteredEvents() {
    return this.events.filter(event => {
      const eventDate = new Date(event.startTime);
      const searchMatch = !this.searchQuery || event.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const venueMatch = !this.venueFilter || event.location.toLowerCase().includes(this.venueFilter.toLowerCase());
      const dateMatch = !this.dateFilter || eventDate.toDateString() === this.dateFilter.toDateString();
      return searchMatch && venueMatch && dateMatch;
    });
  }

  deleteEvent(eventId: number): void {
  if (confirm('Are you sure you want to delete this event?')) {
    this.eventService.deleteEvent(eventId).subscribe({
      next: () => {
        // Remove the deleted event from the UI
        this.events = this.events.filter(event => event.eventId !== eventId);
        console.log('Event deleted successfully');
      },
      error: (err) => {
        console.error('Failed to delete event:', err);
      }
    });
  }
}
}


