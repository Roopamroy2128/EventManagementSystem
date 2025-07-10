import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { TodayEventsComponent } from './today-events/today-events.component'; // ✅ Correct name
import { CreateEventComponent } from './create-event/create-event.component';
import { ClientTableComponent } from './client-table/client-table.component';
import { EventCardsComponent } from './event-cards/event-cards.component'; // adjust the path as needed
import { EventTableComponent } from './event-table/event-table.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminGuard } from './auth/admin.guard';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'view-event/:id', component: ViewEventComponent },
  { path: 'today-event', component: TodayEventsComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'client-table', component: ClientTableComponent },
  { path: 'event-table', component: EventTableComponent },
  { path: 'event-cards', component: EventCardsComponent },
  { path: 'admin-home' , component: AdminHomeComponent},
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AdminGuard] },

{
    path: 'overall-analytics',
    loadComponent: () =>
      import('./overall-analytics/overall-analytics.component').then(m => m.OverallAnalyticsComponent)
  }



   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule {}