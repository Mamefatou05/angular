import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-add-balance',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Ajouter du solde à un agent</h2>

      <form [formGroup]="addBalanceForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            ID du portefeuille de l'agent
          </label>
          <input
            type="text"
            formControlName="userAgentWalletId"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Montant
          </label>
          <input
            type="number"
            formControlName="amount"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            formControlName="description"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          [disabled]="addBalanceForm.invalid || isSubmitting"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {{ isSubmitting ? 'Traitement en cours...' : 'Ajouter le solde' }}
        </button>
      </form>
    </div>
  `

})
export class AddBalanceComponent {
  addBalanceForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.addBalanceForm = this.fb.group({
      userAgentWalletId: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  onSubmit() {
    if (this.addBalanceForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.transactionService.addBalanceToUserAgent(this.addBalanceForm.value)
        .subscribe({
          next: (response) => {
            // Handle success
            console.log('Solde ajouté avec succès', response);
          },
          error: (error) => {
            // Handle error
            console.error('Erreur lors de l\'ajout du solde', error);
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
    }
  }
}
