import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  autoLogin = false;
  showPassword = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.showMessage('Por favor, preencha todos os campos', 'error');
      return;
    }

    if (this.username === 'admin' && this.password === '123456') {
      this.showMessage('Login realizado com sucesso!', 'success');

      if (this.autoLogin) {
        localStorage.setItem('autoLogin', 'true');
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password); // Armazena a senha para login automático
      } else {
        localStorage.removeItem('autoLogin');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }

      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('currentUser', this.username);

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    } else {
      this.showMessage('Usuário ou senha incorretos', 'error');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => (this.messageType = ''), 3000);
  }

  ngOnInit() {
    const auto = localStorage.getItem('autoLogin') === 'true';
    const savedUser = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    
    if (auto && savedUser && savedPassword) {
      this.username = savedUser;
      this.password = savedPassword;
      this.autoLogin = true;
      
      // Login automático
      setTimeout(() => {
        this.login();
      }, 500);
    }
  }
}