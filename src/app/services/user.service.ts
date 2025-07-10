import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserWithEvents {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  events: { title: string; startTime: string }[];
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
  getTotalUserCount(): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/count`);
}
getUserByEmail(email: string): Observable<{ first_name: string; last_name: string }> {
  return this.http.get<{ first_name: string; last_name: string }>(`${this.baseUrl}/by-email?email=${email}`);
}

}
