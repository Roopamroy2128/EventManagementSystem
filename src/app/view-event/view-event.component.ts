import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditEventDialogComponent } from '../edit-event-dialog.component'; // Adjust if needed
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css'],
  imports: [CommonModule, MatDialogModule, FormsModule, ReactiveFormsModule],
})
export class ViewEventComponent implements OnInit {
  eventId!: number;
  event: any;
  attendees: any[] = [];

  currentPage = 1;
  itemsPerPage = 2;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchEvent();
      this.fetchAcceptedUsers(); // 👈

  }

  fetchEvent(): void {
    this.http.get(`https://localhost:7178/api/controller/event/${this.eventId}`).subscribe({
      next: (data: any) => {
        this.event = data;
        this.attendees = data.attendees || [];
      },
      error: (err) => {
        console.error('Error loading event', err);
      },
    });
  }

 
  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditEventDialogComponent, {
      width: '500px',
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.put('https://localhost:7178/api/controller/update', result).subscribe({
          next: () => {
            alert('Event updated successfully');
            this.fetchEvent(); // Refresh data
          },
          error: (err) => {
            console.error('Update failed:', err);
          }
        });
      }
    });
  }

acceptedUsers: any[] = [];

fetchAcceptedUsers(): void {
  this.http.get<any[]>(`https://localhost:7178/api/rsvp/accepted-users?eventId=${this.eventId}`)
    .subscribe({
      next: (users) => {
        this.acceptedUsers = users;
      },
      error: (err) => {
        console.error('Error fetching accepted users:', err);
      }
    });
}

  deleteAttendee(id: number) {
    this.attendees = this.attendees.filter(a => a.id !== id);
  }

  get paginatedAttendees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.attendees.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  getDuration(start: string, end: string): number {
    if (!start || !end) return 0;
    const startTime = new Date(start);
    const endTime = new Date(end);
    return Math.round((endTime.getTime() - startTime.getTime()) / 60000);
  }
}
