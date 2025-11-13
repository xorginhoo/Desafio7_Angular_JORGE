// src/app/models/carbyvin.model.ts
export interface CarByVin {
  // o campo que você usa no template
  codigo?: string;

  // demais campos esperados
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}
