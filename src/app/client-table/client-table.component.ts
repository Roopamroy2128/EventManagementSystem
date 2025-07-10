import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, UserWithEvents } from '../services/user.service'; // ✅ Adjust path
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css'],
})
export class ClientTableComponent implements OnInit {
  searchQuery = '';
  expandedIndex: number | null = null;

  clients: UserWithEvents[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.userService.getUsersWithAcceptedEvents().subscribe({
      next: (data) => (this.clients = data),
      error: (err) => console.error('Failed to fetch clients:', err),
    });
  }

  toggleExpand(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  removeEvent(clientIndex: number, eventIndex: number) {
    this.clients[clientIndex].events.splice(eventIndex, 1);
  }

  get filteredClients() {
    return this.clients.filter((client) =>
      `${client.first_name} ${client.last_name}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
  }
}
