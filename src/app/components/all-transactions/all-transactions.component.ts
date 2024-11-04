// all-transactions.component.ts
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { UserService } from '../../services/user.service';
import { Transaction } from '../../models/transaction.model';
import { ApiResponse } from '../../models/api-response.interface';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe]
})
export class AllTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  currentUser$: Observable<ApiResponse<User>>;
  currentWalletId: string = '';
  selectedTransaction: Transaction | null = null;
  currentFilter: string = '';
  isDetailView: boolean = false;
  currentPage: number = 1;
  pageSize: number = 4; // Taille de la page, configurable
  totalPages: number = 0;


  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
  private apiService: ApiService // Injection du service API

) {
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.currentUser$.subscribe(response => {
      const wallet = response?.data?.wallets?.[0];
      if (wallet) {
        this.currentWalletId = wallet.id;

        this.reloadTransactions()
      }
    });
  }


  loadTransactionsByWallet(page: number = this.currentPage, limit: number = this.pageSize) {
    this.transactionService.getAllTransactionsByWallet(this.currentWalletId, page, limit)
      .subscribe((response: ApiResponse<Transaction[]>) => {
        this.transactions = response.data;
        this.totalPages = response.pagination?.totalPages || 0;
        this.filterTransactions(this.currentFilter);
      });
  }

  loadAllTransactions(page: number = this.currentPage, limit: number = this.pageSize) {
    this.transactionService.getAllTransactions(page, limit)
      .subscribe((response: ApiResponse<Transaction[]>) => {
        this.transactions = response.data;
        this.totalPages = response.pagination?.totalPages || 0;
        this.filterTransactions(this.currentFilter);
      });
  }

  filterTransactions(status: string) {
    this.currentFilter = status;
    this.filteredTransactions = status
      ? this.transactions.filter(transaction => transaction.status === status)
      : this.transactions;
  }

  getTransactionIcon(type: string): string {
    switch(type) {
      case 'DEPOSIT': return 'arrow-down-circle';
      case 'WITHDRAWAL': return 'arrow-up-circle';
      case 'TRANSFERE': return 'repeat';
      case 'INVOICE': return 'file-text';
      default: return 'credit-card';
    }
  }

  getTransactionColor(type: string): string {
    switch(type) {
      case 'DEPOSIT': return 'text-green-600';
      case 'WITHDRAWAL': return 'text-red-600';
      case 'TRANSFERE': return 'text-blue-600';
      case 'INVOICE': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  }

  getStatusInfo(status: string): { color: string, background: string, icon: string } {
    switch(status) {
      case 'COMPLETED':
        return { color: 'text-green-600', background: 'bg-green-50', icon: 'check-circle' };
      case 'FAILED':
        return { color: 'text-red-600', background: 'bg-red-50', icon: 'x-circle' };
      case 'PENDING':
        return { color: 'text-orange-600', background: 'bg-orange-50', icon: 'clock' };
      default:
        return { color: 'text-gray-600', background: 'bg-gray-50', icon: 'help-circle' };
    }
  }

  showTransactionDetails(transaction: Transaction) {
    this.selectedTransaction = transaction;
    this.isDetailView = true;
  }

  backToList() {
    this.selectedTransaction = null;
    this.isDetailView = false;
  }

  deleteTransaction(transactionId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      // Implémentez la logique de suppression ici
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.reloadTransactions();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.reloadTransactions();
    }
  }

  reloadTransactions() {
    if (this.apiService.isAdmin()) {
      this.loadAllTransactions(this.currentPage, this.pageSize);
    } else if (this.apiService.isClient()) {
      this.loadTransactionsByWallet(this.currentPage, this.pageSize);
    }
  }

}
