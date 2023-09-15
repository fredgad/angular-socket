import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';

  constructor(private http: HttpClient) {}

  public login() {
    const body = { username: this.username, password: this.password };
    const serverApi = 'https://ruslan-server.azurewebsites.net/api/login';

    this.http.post(serverApi, body).subscribe(
      (response) => {
        console.log('Response:', response);
        // Handle the response here
      },
      (error) => {
        console.error('Error:', error);
        // Handle errors here
      }
    );
  }
}
