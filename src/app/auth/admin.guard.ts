import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userData = localStorage.getItem('user');

    // Check if user is logged in
    if (!userData) {
      alert('Please login first.');
      this.router.navigate(['/login']);
      return false;
    }

    // Parse user data
    const user = JSON.parse(userData);

    // Check for Admin role
    if (user.role === 'Admin') {
      return true;
    } else {
      alert('Access denied. Admins only.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
