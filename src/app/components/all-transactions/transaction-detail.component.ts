// transaction-detail.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  template: `
    <div *ngIf="transaction" class="bg-white rounded-xl shadow-lg p-6">
      <!-- En-tête des détails -->
      <div class="flex items-center gap-4 mb-8">
        <div [class]="getTransactionColor(transaction.type) + ' w-16 h-16 rounded-full flex items-center justify-center'"
             [class.bg-green-50]="transaction.type === 'DEPOSIT'"
             [class.bg-red-50]="transaction.type === 'WITHDRAWAL'"
             [class.bg-blue-50]="transaction.type === 'TRANSFERE'"
             [class.bg-purple-50]="transaction.type === 'INVOICE'">
          <i [class]="'fas fa-' + getTransactionIcon(transaction.type) + ' text-2xl'"></i>
        </div>
        <div>
          <h2 class="text-2xl font-bold">{{transaction.type}}</h2>
          <div class="mt-2">
            <span [class]="getStatusInfo(transaction.status).color + ' ' + getStatusInfo(transaction.status).background + ' px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2'">
              <i [class]="'fas fa-' + getStatusInfo(transaction.status).icon"></i>
              {{transaction.status}}
            </span>
          </div>
        </div>
      </div>

      <!-- Montant -->
      <div class="bg-gray-50 rounded-xl p-8 mb-8 text-center">
        <p class="text-gray-500 mb-2">Montant</p>
        <p class="text-4xl font-bold"
           [class.text-green-600]="transaction.type === 'DEPOSIT'"
           [class.text-red-600]="transaction.type === 'WITHDRAWAL'">
          {{transaction.amount | currency:'EUR'}}
        </p>
      </div>

      <!-- Informations détaillées -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Expéditeur -->
        <div class="bg-white rounded-xl border p-6 hover:border-blue-500 transition-colors">
          <h3 class="font-semibold mb-4 flex items-center gap-2 text-lg">
            <i class="fas fa-user"></i>
            Expéditeur
          </h3>
          <div class="space-y-4">
            <div class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-user text-sm"></i>
              <span>{{transaction.senderWallet?.user?.firstName}} {{transaction.senderWallet?.user?.lastName}}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-phone text-sm"></i>
              <span>{{transaction.senderWallet?.user?.phoneNumber}}</span>
            </div>
          </div>
        </div>

        <!-- Destinataire -->
        <div class="bg-white rounded-xl border p-6 hover:border-blue-500 transition-colors">
          <h3 class="font-semibold mb-4 flex items-center gap-2 text-lg">
            <i class="fas fa-user"></i>
            Destinataire
          </h3>
          <div class="space-y-4">
            <div class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-user text-sm"></i>
              <span>{{transaction.receiverWallet?.user?.firstName}} {{transaction.receiverWallet?.user?.lastName}}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-phone text-sm"></i>
              <span>{{transaction.receiverWallet?.user?.phoneNumber}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations supplémentaires -->
      <div class="mt-8 space-y-4 bg-gray-50 rounded-xl p-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="flex items-center gap-3 text-gray-600">
            <i class="fas fa-calendar text-sm"></i>
            <span>Créé le: {{transaction.createdAt | date:'dd MMMM yyyy à HH:mm'}}</span>
          </div>
          <div class="flex items-center gap-3 text-gray-600">
            <i class="fas fa-clock text-sm"></i>
            <span>Mis à jour le: {{transaction.updatedAt | date:'dd MMMM yyyy à HH:mm'}}</span>
          </div>
          <div class="flex items-center gap-3 text-gray-600">
            <i class="fas fa-dollar-sign text-sm"></i>
            <span>Frais: {{transaction.feeAmount | currency:transaction.feeCurrency}}</span>
          </div>
          <div *ngIf="transaction.description" class="flex items-start gap-3 text-gray-600 md:col-span-2">
            <i class="fas fa-comment text-sm mt-1"></i>
            <span>{{transaction.description}}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex flex-wrap gap-4 justify-end">
        <button (click)="onBack()"
                class="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2 text-gray-700">
          <i class="fas fa-arrow-left"></i>
          Retour à la liste
        </button>

        <button *ngIf="transaction.status === 'PENDING'"
                class="px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2">
          <i class="fas fa-check"></i>
          Approuver
        </button>

        <button (click)="onDelete(transaction.id)"
                class="px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2">
          <i class="fas fa-trash"></i>
          Supprimer
        </button>
      </div>
    </div>
  `
})
export class TransactionDetailComponent {
  @Input() transaction: Transaction | null = null;
  @Output() back = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

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

  onBack() {
    this.back.emit();
  }

  onDelete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      this.delete.emit(id);
    }
  }
}
