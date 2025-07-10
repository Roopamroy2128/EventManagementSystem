import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  eventId: number;
  title: string;
  location: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  category?: string;
}


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'https://localhost:7178/api/controller';
  private baseUrl2 = 'https://localhost:7178/api/events/update';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/eventlist`);
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, eventData);
  }

  updateEvent(eventData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, eventData);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
