// src/app/models/exchange-rate.model.ts
export interface ExchangeRate {
  code: string;
  country: string;
  flag: string;
  rateFromCFA: number;
  trend: string;
  color: string;
}
