import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

constructor(private authService: AuthService, private router: Router) {}
  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: res => {
        console.log('Login successful:', res);
        
        // Redirect or store user info here
          localStorage.setItem('user', JSON.stringify(res));
         if (res.role === 'Admin') {
            this.router.navigate(['/admin-home']);
              // ✅ Store user

          } else if (res.role === 'User') {
            this.router.navigate(['/event-cards']);
          }
      },
      error: err => {
        console.error('Login failed:', err);
        alert('Invalid email or password');
      }
    });
  }
}
