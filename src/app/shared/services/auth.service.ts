import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$i = signal(true); // Flag to track user authentication state

  // Simulate user login
  login(username: string, password: string): boolean {
    // In a real application, you would make an API call to validate the user's credentials
    // For simplicity, let's assume a predefined username and password for this example
    if (username === 'user' && password === 'password') {
      this.isAuthenticated$i.set(true);
      return true;
    }
    return false;
  }

  // Log the user out
  public logout(): void {
    this.isAuthenticated$i.set(false);
  }
}
