import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Effectuer un dépôt</h2>

      <form [formGroup]="depositForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Numéro de téléphone
          </label>
          <input
            type="text"
            formControlName="senderPhoneNumber"
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
          [disabled]="depositForm.invalid || isSubmitting"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {{ isSubmitting ? 'Traitement en cours...' : 'Effectuer le dépôt' }}
        </button>
      </form>
    </div>
  `
})
export class DepositComponent {
  depositForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.depositForm = this.fb.group({
      senderPhoneNumber: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  onSubmit() {
    if (this.depositForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.transactionService.createDeposit(this.depositForm.value)
        .subscribe({
          next: (response) => {
            // Handle success
            console.log('Dépôt effectué avec succès', response);
          },
          error: (error) => {
            // Handle error
            console.error('Erreur lors du dépôt', error);
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
    }
  }
}
