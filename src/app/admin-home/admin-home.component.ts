import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EventService, Event } from '../services/event.service'; // adjust the path
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  totalEvents = 0;
  upcomingEvents = 0;
  totalUsers = 200;
  userName = '';


  events: Event[] = [];

constructor(private router: Router, private eventService: EventService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchEvents();
      this.fetchTotalUsers();
        this.fetchUserName();


  }

 fetchUserName() {
  const email = localStorage.getItem('userEmail'); // ensure this is set during login
  if (email) {
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.userName = `${user.first_name} ${user.last_name}`; // updated to match API keys
      },
      error: (err) => {
        console.error('Failed to fetch user name:', err);
        this.userName = 'User'; // fallback
      }
    });
  } else {
    this.userName = 'User'; // fallback if no email found
  }
}

fetchTotalUsers() {
  this.userService.getTotalUserCount().subscribe({
    next: (count) => {
      this.totalUsers = count;
    },
    error: (err) => {
      console.error('Failed to fetch total user count:', err);
    }
  });
}

 fetchEvents() {
  this.eventService.getEvents().subscribe({
    next: (data) => {
      this.totalEvents = data.length;

      // Parse start and end times to Date objects
      const parsedEvents = data.map(event => ({
        ...event,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime)
      }));

      // Get today's local date
      const today = new Date();

      const isToday = (date: Date): boolean =>
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      // Filter only events that are scheduled for today
      const todayEvents = parsedEvents.filter(e => isToday(e.startTime));

      this.upcomingEvents = todayEvents.length;
      this.events = todayEvents; // Show only today's events in table
    },
    error: (err) => {
      console.error('Failed to fetch events:', err);
    }
  });
}

logout() {
  // If using localStorage/sessionStorage for login status
 

  // Redirect to login page
  this.router.navigate(['/login']);
}

  goToCreateEvent() {
    this.router.navigate(['/create-event']);
  }

  goToClientTable() {
    this.router.navigate(['/client-table']);
  }

  goToAnalytics() {
    this.router.navigate(['/event-table']);
  }

  goToManageEvent() {
    this.router.navigate(['/view-event']);
  }
}
