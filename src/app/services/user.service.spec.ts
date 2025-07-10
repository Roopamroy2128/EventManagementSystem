import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventDto {
  title: string;
  startTime: string;
}

export interface UserWithEvents {
  id: number;
  first_Name: string;
  last_Name: string;
  email: string;
  phone_Number: string;
  events: EventDto[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7178/api/users';

  constructor(private http: HttpClient) {}

  getUsersWithAcceptedEvents(): Observable<UserWithEvents[]> {
    return this.http.get<UserWithEvents[]>(`${this.baseUrl}/with-accepted-events`);
  }
}
