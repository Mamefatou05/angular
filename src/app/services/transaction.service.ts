import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.interface';
import {Transaction, TransferFormData} from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends ApiService {
  private readonly BASE_PATH = '/transaction';

  getAllTransactions(page: number, limit: number): Observable<ApiResponse<Transaction[]>> {
    return this.get<Transaction[]>(`${this.BASE_PATH}/all`, { params: { page, limit } });
  }




  // Récupérer les transactions d'un utilisateur spécifique
  getAllTransactionsByUser(userId: string): Observable<ApiResponse<Transaction[]>> {
    return this.get<Transaction[]>(`${this.BASE_PATH}/user/${userId}/all`);
  }

  getAllTransactionsByWallet(walletId: string, page: number, limit: number): Observable<ApiResponse<Transaction[]>> {
    return this.get<Transaction[]>(`${this.BASE_PATH}/wallet/${walletId}/all`, { params: { page, limit } });
  }

  // Créer un dépôt (agents uniquement)
  createDeposit(data: {
    userId: string;
    amount: number;
    description?: string;
  }): Observable<ApiResponse<Transaction>> {
    return this.post<Transaction>(`${this.BASE_PATH}/deposit`, data);
  }

  // Créer un retrait (agents uniquement)
  createWithdrawal(data: {
    userId: string;
    amount: number;
    description?: string;
  }): Observable<ApiResponse<Transaction>> {
    return this.post<Transaction>(`${this.BASE_PATH}/withdrawal`, data);
  }

  // Créer un transfert (clients, agents, et admins)
  createTransfer(formData: TransferFormData): Observable<ApiResponse<Transaction>> {
    console.log(`${this.BASE_PATH}/transfer`)
    return this.http.post<ApiResponse<Transaction>>(`api/${this.BASE_PATH}/transfer`, formData);
  }


  // Ajouter du solde à un agent (admin uniquement)
  addBalanceToUserAgent(data: {
    userId: string;
    amount: number;
    description?: string;
  }): Observable<ApiResponse<Transaction>> {
    return this.post<Transaction>(`${this.BASE_PATH}/add-balance`, data);
  }
}
