import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import {CurrencyPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf

  ],
  templateUrl: './wallet.component.html',

})
export class WalletComponent implements OnInit {
  balance = 0;
  loading = true;

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.loadBalance();
  }

  private loadBalance() {
    this.walletService.getBalance().subscribe({
      next: (response) => {
        this.balance = response.data.amount;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
