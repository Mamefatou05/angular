import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Transaction } from '../../../models/transaction.model';
import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../models/api-response.interface';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  templateUrl: './transaction-list.component.html',
  imports: [
    DatePipe,
    NgIf,
    NgClass,
    CurrencyPipe,
    NgForOf
  ]
})
export class TransactionListComponent implements OnInit {
  currentUser$: Observable<ApiResponse<User>>;
  transactions: Transaction[] = [];
  displayedTransactions: Transaction[] = []; // Pour stocker les transactions affichées
  loading = true;
  currentWalletId: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.currentUser$.subscribe(response => {
      const wallet = response?.data?.wallets?.[0];

      if (wallet) {
        this.currentWalletId = wallet.id;

        // Combine et trie les transactions envoyées et reçues
        this.transactions = [
          ...(wallet.sentTransactions ?? []), // Utilisation de ?? pour éviter des valeurs nulles
          ...(wallet.receivedTransactions ?? [])
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Assignez les transactions à afficher
        this.displayedTransactions = this.transactions;
      }

      this.loading = false;
    });
  }

  getTransactionPartner(transaction: Transaction): string {
    if (transaction.senderWalletId === this.currentWalletId) {
      // Vérifiez si receiverWallet existe avant d'accéder à ses propriétés
      const receiver = transaction.receiverWallet?.user;
      return receiver ? `${receiver.firstName} ${receiver.lastName}` : 'Partenaire inconnu';
    } else {
      // Vérifiez si senderWallet existe avant d'accéder à ses propriétés
      const sender = transaction.senderWallet?.user;
      return sender ? `${sender.firstName} ${sender.lastName}` : 'Partenaire inconnu';
    }
  }


  getTransactionType(transaction: Transaction): string {
    return transaction.senderWalletId === this.currentWalletId ? 'ENVOYÉ' : 'REÇU';
  }

  getAmountPrefix(transaction: Transaction): string {
    return transaction.senderWalletId === this.currentWalletId ? '-' : '+';
  }

  onFilter() {
    // Logique de filtrage ici
  }

  onSort() {
    // Logique de tri ici
  }

  viewAll() {
    this.router.navigate(['/transactions']);
  }
}
