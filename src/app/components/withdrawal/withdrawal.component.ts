import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-withdrawal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Effectuer un retrait</h2>

      <form [formGroup]="withdrawalForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Numéro de téléphone (émetteur)
          </label>
          <input
            type="text"
            formControlName="senderPhoneNumber"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Numéro de téléphone (récepteur)
          </label>
          <input
            type="text"
            formControlName="receiverPhoneNumber"
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
          [disabled]="withdrawalForm.invalid || isSubmitting"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {{ isSubmitting ? 'Traitement en cours...' : 'Effectuer le retrait' }}
        </button>
      </form>
    </div>
  `
})
export class WithdrawalComponent {
  withdrawalForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.withdrawalForm = this.fb.group({
      senderPhoneNumber: ['', [Validators.required]],
      receiverPhoneNumber: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  onSubmit() {
    if (this.withdrawalForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.transactionService.createWithdrawal(this.withdrawalForm.value)
        .subscribe({
          next: (response) => {
            // Handle success
            console.log('Retrait effectué avec succès', response);
          },
          error: (error) => {
            // Handle error
            console.error('Erreur lors du retrait', error);
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
    }
  }
}
