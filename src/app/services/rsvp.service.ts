import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateRsvpRequest {
  userId: number;
  eventId: number;
  status: string; // 'Attending' or 'Not Attending'
}
@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  private baseUrl = 'https://localhost:7178/api/rsvp';

  constructor(private http: HttpClient) {}

  createRsvp(request: CreateRsvpRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/attendes`, request);
  }

  // ✅ New method to get accepted event IDs for a user
  getAcceptedEventIds(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/accepted?userId=${userId}`);
  }

  deleteRsvp(userId: number, eventId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/delete?userId=${userId}&eventId=${eventId}`);
}
}

