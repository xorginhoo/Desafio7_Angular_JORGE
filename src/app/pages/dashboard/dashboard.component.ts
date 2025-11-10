import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component'; // importa o seu header

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent], // <-- isso aqui é o segredo
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}
