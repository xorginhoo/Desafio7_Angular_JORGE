import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // troque .scss por .css se for esse o seu arquivo
})
export class LoginComponent {
  username = '';
  password = '';
  autoLogin = false;
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
      } else {
        localStorage.removeItem('autoLogin');
        localStorage.removeItem('username');
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

  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => (this.messageType = ''), 3000);
  }

  ngOnInit() {
    const auto = localStorage.getItem('autoLogin') === 'true';
    const savedUser = localStorage.getItem('username');
    if (auto && savedUser) {
      this.username = savedUser;
      this.autoLogin = true;
    }
  }
}
