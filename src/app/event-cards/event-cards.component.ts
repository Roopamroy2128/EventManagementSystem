import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService, Event } from '../services/event.service';
import { RsvpService } from '../services/rsvp.service'; // 👈 Added
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-event-cards',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,RouterModule],
  templateUrl: './event-cards.component.html',
  styleUrls: ['./event-cards.component.css']
})
export class EventCardsComponent implements OnInit {
  selectedTab = 'past';
  searchTitle = '';
  searchVenue = '';
  searchDate = '';
  showSuccessPopup = false;

  events: any[] = [];
  userId: number = 1; // 🔐 In real apps, get this from login/session

  constructor(private eventService: EventService, private rsvpService: RsvpService,private router: Router) {}
  

  ngOnInit(): void {
  this.loadEventsAndAccepted();
}

  loadEventsAndAccepted(): void {
  this.eventService.getEvents().subscribe({
    next: (allEvents: Event[]) => {
      this.rsvpService.getAcceptedEventIds(this.userId).subscribe({
        next: (acceptedIds: number[]) => {
          this.events = allEvents.map(event => ({
            ...event,
            date: new Date(event.startTime).toLocaleDateString(),
            time: `${new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            venue: event.location,
            mode: event.category || 'N/A',
            accepted: acceptedIds.includes(event.eventId)
          }));
        },
        error: err => console.error('Failed to load accepted events:', err)
      });
    },
    error: err => console.error('Failed to load events:', err)
  });
}

 filteredEvents() {
  const filtered = this.events.filter(e =>
    e.title.toLowerCase().includes(this.searchTitle.toLowerCase()) &&
    e.venue.toLowerCase().includes(this.searchVenue.toLowerCase()) &&
    e.date.includes(this.searchDate)
  );

  if (this.selectedTab === 'accepted') {
    return filtered.filter(e => e.accepted);
  }

  if (this.selectedTab === 'past') {
    const today = new Date();
    return filtered.filter(e => new Date(e.date) < today);
  }

  // Default: upcoming
  return filtered.filter(e => new Date(e.date) >= new Date());
}

logout() {
  // If using localStorage/sessionStorage for login status
 

  // Redirect to login page
  this.router.navigate(['/login']);
}


  acceptEvent(event: any) {
  const rsvp = {
    userId: this.userId,
    eventId: event.eventId,
    status: 'Attending'
  };

  this.rsvpService.createRsvp(rsvp).subscribe({
    next: () => {
      this.showSuccessPopup = true;
      event.accepted = true;
      setTimeout(() => {
        this.showSuccessPopup = false;
      }, 3000);
    },
    error: (err) => {
      console.error('RSVP failed:', err);
      alert('Failed to accept the event.');
    }
  });
}

}
