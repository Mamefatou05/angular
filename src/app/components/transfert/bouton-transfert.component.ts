// bouton-transfert.component.ts
import { Component } from '@angular/core';
import { TransferComponent } from './transfer.component';  // Assurez-vous que le chemin est correct
import { NgIf } from '@angular/common';
import { TransferFormData } from '../../models/transaction.model';  // Assurez-vous que le chemin est correct

@Component({
    selector: 'app-transfer-button',
    standalone: true,
    imports: [NgIf, TransferComponent], // Important: le composant doit être importé ici
    template: `
      <!-- Bouton de transfert -->
      <button
        (click)="openTransferModal()"
        class="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Nouveau transfert"
      >
        <!-- Icône de transfert -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white transition-transform duration-200 group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>

        <!-- Texte flottant au survol -->
        <span class="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-800 text-white text-sm py-2 px-4 rounded whitespace-nowrap">
          Nouveau transfert
        </span>
      </button>

      <!-- Modal de transfert -->
      @if (showTransferModal) {
        <app-transfer
          [editablePhone]="true"
          (onClose)="closeTransferModal()"
          (onSuccess)="handleTransferSuccess($event)"
        />
      }
  `,
    styles: [`
    :host {
      display: block;
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 40;
    }
  `]
})
export class TransferButtonComponent {
    showTransferModal = false;

    openTransferModal(): void {
        this.showTransferModal = true;
    }

    closeTransferModal(): void {
        this.showTransferModal = false;
    }

    handleTransferSuccess(data: TransferFormData): void {
        console.log('Transfert réussi:', data);
        this.showTransferModal = false;
    }
}
