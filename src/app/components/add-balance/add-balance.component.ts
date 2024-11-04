import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-add-balance',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="addBalanceForm" (ngSubmit)="onSubmit()" class="w-full p-4 sm:p-6 lg:p-8 m-4 rounded-3xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Numéro du portefeuille de l'agent
          </label>
          <input
            type="text"
            formControlName="agentphoneNumber"
            class="w-full rounded-full border-gray-300 shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Montant
          </label>
          <input
            type="number"
            formControlName="amount"
            class="w-full rounded-full border-gray-300 shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            formControlName="description"
            class="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 mt-8">
        <button
          type="submit"
          [disabled]="addBalanceForm.invalid || isSubmitting"
          class="w-full sm:w-auto px-6 py-3 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition transform hover:scale-105"
        >
          {{ isSubmitting ? 'Traitement en cours...' : 'Ajouter le solde' }}
        </button>
      </div>
    </form>
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
      agentphoneNumber: ['', [Validators.required]],
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
            console.log('Solde ajouté avec succès', response);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du solde', error);
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
    }
  }
}
