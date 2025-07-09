import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = 'admin';
  password = '1234';
  inputUsername = '';
  inputPassword = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    if (this.inputUsername === this.username && this.inputPassword === this.password) {
      this.router.navigate(['/products']);
    } else {
      this.error = 'Invalid credentials';
    }
  }

  onSubmit(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}
