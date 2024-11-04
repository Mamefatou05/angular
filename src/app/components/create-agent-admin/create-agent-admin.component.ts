import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-agent-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  template: `
    <form *ngIf="isFormVisible" [formGroup]="agentForm" (ngSubmit)="submitForm()" class="w-full p-4 sm:p-6 lg:p-8 m-4 rounded-3xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">Prénom</label>
          <input
            type="text"
            formControlName="firstName"
            class="w-full rounded-full border-gray-300 shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">Nom</label>
          <input
            type="text"
            formControlName="lastName"
            class="w-full rounded-full border-gray-300 shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            formControlName="email"
            class="w-full rounded-full border-gray-300 shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">Numéro de téléphone</label>
          <input
            type="text"
            formControlName="phoneNumber"
            class="w-full rounded-full border-gray-300 shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">Rôle</label>
          <select
            formControlName="role"
            class="w-full rounded-full border-gray-300 shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="AGENT">Agent</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">Mot de passe</label>
          <input
            type="password"
            formControlName="password"
            class="w-full rounded-full border-gray-300 shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 mt-8">
        <button type="button" (click)="cancel()"
                class="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-full shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 transition transform hover:scale-105">
          Annuler
        </button>
        <button type="submit" [disabled]="agentForm.invalid || isLoading"
                class="w-full sm:w-auto px-6 py-3 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition transform hover:scale-105">
          {{ isLoading ? 'Création en cours...' : 'Créer' }}
        </button>
      </div>
    </form>  `
})
export class CreateAgentAdminComponent {
  agentForm: FormGroup;
  isLoading = false;
  isFormVisible = true;


  constructor(private fb: FormBuilder, private userService: UserService) {
    this.agentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.agentForm.invalid) return;

    this.isLoading = true;
    this.userService.createAgent(this.agentForm.value).subscribe(
      (response) => {
        console.log('Agent créé avec succès', response);
        this.agentForm.reset();
        this.isLoading = false;
        this.isFormVisible = false;

      },
      (error) => {
        console.error('Erreur lors de la création de l\'agent', error);
        this.isLoading = false;
      }
    );
  }

  cancel() {
    this.isFormVisible = false;
  }
}
