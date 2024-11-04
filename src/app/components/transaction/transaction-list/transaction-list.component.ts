import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Transaction } from '../../../models/transaction.model';
import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../models/api-response.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleArrowDown,
  faCircleArrowUp,
  faArrowsRotate,
  faFileLines,
  faCircleCheck,
  faClock,
  faCircleXmark,
  faBan,
  faFilter,
  faArrowsUpDown,
  faEllipsisH,
  faChartLine,
  faCircleQuestion
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  templateUrl: './transaction-list.component.html',
  imports: [
    DatePipe,
    NgIf,
    NgClass,
    CurrencyPipe,
    NgForOf,
    FontAwesomeModule
  ]
})
export class TransactionListComponent implements OnInit {
  faCircleArrowDown = faCircleArrowDown;
  faCircleArrowUp = faCircleArrowUp;
  faArrowsRotate = faArrowsRotate;
  faFileLines = faFileLines;
  faCircleCheck = faCircleCheck;
  faClock = faClock;
  faCircleXmark = faCircleXmark;
  faBan = faBan;
  faFilter = faFilter;
  faArrowsUpDown = faArrowsUpDown;
  faEllipsisH = faEllipsisH;
  faChartLine = faChartLine;
  faCircleQuestion = faCircleQuestion;

  currentUser$: Observable<ApiResponse<User>>;
  transactions: Transaction[] = [];
  displayedTransactions: Transaction[] = [];
  loading = true;
  currentWalletId: string = '';

  readonly STATUS_COMPONENTS = {
    'COMPLETED': this.faCircleCheck,
    'PENDING': this.faClock,
    'FAILED': this.faCircleXmark,
    'CANCELLED': this.faBan
  };

  readonly TYPE_COMPONENTS = {
    'DEPOSIT': this.faCircleArrowDown,
    'WITHDRAWAL': this.faCircleArrowUp,
    'TRANSFERE': this.faArrowsRotate,
    'INVOICE': this.faFileLines
  };


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
          ...(wallet.sentTransactions ?? []),
          ...(wallet.receivedTransactions ?? [])
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Assignez les deux dernières transactions à afficher
        this.displayedTransactions = this.transactions.slice(0, 2);
      }

      this.loading = false;
    });
  }


  getTransactionPartner(transaction: Transaction): string {
    if (transaction.senderWalletId === this.currentWalletId) {
      const receiver = transaction.receiverWallet?.user;
      return receiver ? `${receiver.firstName} ${receiver.lastName}` : 'Partenaire inconnu';
    } else {
      const sender = transaction.senderWallet?.user;
      return sender ? `${sender.firstName} ${sender.lastName}` : 'Partenaire inconnu';
    }
  }

  getTransactionType(transaction: Transaction): string {
    return transaction.senderWalletId === this.currentWalletId ? 'ENVOYÉ' : 'REÇU';
  }
  getStatusIcon(status: Transaction['status']) {
    return this.STATUS_COMPONENTS[status] || this.faCircleQuestion;
  }

  getTypeIcon(type: Transaction['type']) {
    return this.TYPE_COMPONENTS[type] || this.faCircleQuestion;
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



