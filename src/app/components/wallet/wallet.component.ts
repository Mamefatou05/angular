// src/app/components/wallet/wallet.component.ts
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { UserService } from '../../services/user.service';
import { Wallet } from '../../models/wallet.model';
import { ExchangeRate } from '../../models/exchange-rate.model';
import { CurrencyPipe, NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-wallet',
  standalone: true,
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  imports: [CurrencyPipe, NgIf, NgForOf, NgClass]
})
export class WalletComponent implements OnInit {
  loading = true;
  balance = 0;
  exchangeRates: ExchangeRate[] = [];
  isBalanceVisible = false; // Ajoutez cette ligne


  constructor(
    private currencyService: CurrencyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: ({data: user}) => {
        if (user?.wallets?.[0]) {
          if (user.wallets) {
            this.balance = +user.wallets[0].balance;
          }
          this.exchangeRates = this.currencyService.getExchangeRates();
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  toggleBalanceVisibility(): void {
    this.isBalanceVisible = !this.isBalanceVisible;
  }

  getConvertedBalance(currency: string): number {
    return this.currencyService.convertFromCFA(this.balance, currency);
  }
}
