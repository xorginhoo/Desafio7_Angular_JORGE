import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Veiculos, VeiculosAPI } from '../models/veiculo.model';
import { CarByVin } from '../models/carbyvin.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiURL = 'http://localhost:3001';
  private readonly http = inject(HttpClient);

  // 🔹 Login
  login(nome: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiURL}/login`, { nome, senha });
  }

  // 🔹 Lista de veículos
  getVehicles(): Observable<Veiculos> {
    return this.http
      .get<VeiculosAPI>(`${this.apiURL}/vehicles`)
      .pipe(map((res) => res.vehicles));
  }

  // 🔹 Busca VIN
  checkVinCode(vin: string): Observable<CarByVin> {
    return this.http.post<CarByVin>(`${this.apiURL}/vehicleData`, { vin });
  }
}
