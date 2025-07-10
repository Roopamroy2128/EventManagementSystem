import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  standalone: true,
  selector: 'app-overall-analytics',
  imports: [CommonModule],
  templateUrl: './overall-analytics.component.html',
  styleUrls: ['./overall-analytics.component.css']
})
export class OverallAnalyticsComponent implements OnInit {
  userCount = 0;
  eventCount = 0;
  cityStats: { [city: string]: number } = {};

  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Event Distribution by City' }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAnalytics();
  }

  fetchAnalytics() {
    this.http.get<any>('https://localhost:7178/api/analytics/overview').subscribe(data => {
      this.userCount = data.totalUsers;
      this.eventCount = data.totalEvents;
      this.cityStats = data.eventCities;

      this.pieChartLabels = Object.keys(this.cityStats);
      this.pieChartData = Object.values(this.cityStats);
    });
  }
}
