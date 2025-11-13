import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { tap } from 'rxjs';

import { ApiService } from '../../service/api.service';
import { Veiculo } from '../../models/veiculo.model';
import { CarByVin } from '../../models/carbyvin.model';
import { HeaderComponent } from '../../components/header/header.component'; // ✅ importe do header

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, HeaderComponent], // ✅ header incluso
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('carSelect') carSelect!: ElementRef<HTMLSelectElement>;

  menuAberto = false;
  vehicles: Veiculo[] = [];
  selectedVehicle: Veiculo | null = null;
  filteredVehicles: CarByVin[] = [];
  searchTerm: string = '';

  totalVendas = 0;
  conectados = 0;
  updateSoftware = 0;
  selectedVehicleImage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.onSelectVehicle());
  }

  // 🔹 Carrega lista de veículos
  loadVehicles(): void {
    this.apiService.getVehicles()
      .pipe(tap((vehicles) => (this.vehicles = vehicles)))
      .subscribe({
        next: (vehicles) => {
          console.log('🚗 Veículos carregados:', vehicles);

          if (vehicles && vehicles.length > 0) {
            this.selectedVehicle = vehicles[0];
            this.selectedVehicleImage = this.selectedVehicle.img || '';
            try {
              if (this.carSelect && this.carSelect.nativeElement) {
                this.carSelect.nativeElement.value = String(this.selectedVehicle.id);
              }
            } catch {}
          }
        },
        error: (err) => {
          console.error('❌ Erro ao carregar veículos:', err);
          alert('Erro ao buscar veículos! Verifique se o servidor Node está rodando.');
        }
      });
  }

  // 🔹 Seleciona o veículo
  onSelectVehicle(): void {
    const select = this.carSelect.nativeElement as HTMLSelectElement;
    const id = Number(select.value);
    this.selectedVehicle = this.vehicles.find(v => v.id === id) || null;
    this.selectedVehicleImage = this.selectedVehicle?.img || '';
    this.filteredVehicles = [];

    console.log('🚙 Veículo selecionado:', this.selectedVehicle);
  }

  // 🔹 Busca dados por VIN
  filtrarPorVin(): void {
    const term = (this.searchTerm ?? '').trim();

    if (!term) {
      this.filteredVehicles = [];
      return;
    }

    this.apiService.checkVinCode(term).subscribe({
      next: (response) => {
        this.filteredVehicles = [{
          codigo: term,
          odometro: response.odometro,
          nivelCombustivel: response.nivelCombustivel,
          status: response.status,
          lat: response.lat,
          long: response.long
        }];
      },
      error: (err) => {
        console.error('❌ Erro ao buscar VIN:', err);
        this.filteredVehicles = [];
      }
    });
  }

  // 🔹 Navegação e menu
  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  irParaDashboard(): void {
    this.menuAberto = false;
    this.router.navigate(['/dashboard']);
  }

  irParaHome(): void {
    this.menuAberto = false;
    this.router.navigate(['/home']);
  }
}
