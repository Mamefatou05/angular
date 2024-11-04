// src/app/services/currency.service.ts
import { Injectable } from '@angular/core';
import { ExchangeRate } from '../models/exchange-rate.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly exchangeRates: ExchangeRate[] = [
    { code: 'CFA', country: 'Sénégal', flag: '🇸🇳', rateFromCFA: 1, trend: '+0.0%', color: 'from-yellow-400 to-yellow-600' },
    { code: 'EUR', country: 'European Union', flag: '🇪🇺', rateFromCFA: 1 / 655.957, trend: '+2.4%', color: 'from-emerald-400 to-teal-500' },
    { code: 'USD', country: 'United States', flag: '🇺🇸', rateFromCFA: 1 / 600, trend: '+1.8%', color: 'from-blue-400 to-indigo-500' },
    { code: 'NGN', country: 'Nigeria', flag: '🇳🇬', rateFromCFA: 1.32, trend: '-0.5%', color: 'from-green-400 to-green-600' }
  ];

  getExchangeRates(): ExchangeRate[] {
    return this.exchangeRates;
  }

  convertFromCFA(amount: number, targetCurrency: string): number {
    const rate = this.exchangeRates.find(r => r.code === targetCurrency)?.rateFromCFA || 1;
    return amount * rate;
  }
}
