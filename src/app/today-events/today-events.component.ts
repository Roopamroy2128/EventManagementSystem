import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-today-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './today-events.component.html',
  styleUrls: ['./today-events.component.css']
})
export class TodayEventsComponent {
  events = [
    { title: 'Discussion on AI by Dr. RAM', time: '10:00 AM - 10:45 AM', location: 'ABC' },
    { title: 'Workshop on AI by Dr. RAM', time: '10:45 AM - 1:00 PM', location: 'sdjs' },
    { title: 'Workshop on AI by Dr. RAM', time: '5:00 PM - 7:00 PM', location: 'sdsdsdsd' },
  ];
}
