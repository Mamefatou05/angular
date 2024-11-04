import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { CreateAgentAdminComponent } from '../../create-agent-admin/create-agent-admin.component';
import { AddBalanceComponent } from '../../add-balance/add-balance.component';

@Component({
  selector: 'app-quick-create',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    CreateAgentAdminComponent,
    AddBalanceComponent
  ],
  template: `
    <div class="bg-white rounded-xl shadow-md p-4 md:p-6">
      <h2 class="text-lg md:text-xl font-semibold mb-4">Actions rapides</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        <button *ngFor="let action of actions"
                [class]="action.buttonClass"
                class="p-3 md:p-4 rounded-lg flex flex-col items-center transition-colors"
                [ngClass]="action.colorClass"
                (click)="handleActionClick(action.id)"
        >
          <ng-container *ngIf="action.icon">
            <i [class]="action.icon" class="h-6 w-6 md:h-8 md:w-8 mb-2"></i>
          </ng-container>
          <span class="text-xs md:text-sm">{{ action.label }}</span>
        </button>
      </div>
    </div>

    <!-- Modal pour la création d'agent -->
    <div *ngIf="showCreateAgentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-lg mx-4">
        <div class="flex justify-end p-2">
          <button class="text-gray-500 hover:text-gray-700" (click)="showCreateAgentModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <app-create-agent-admin></app-create-agent-admin>
      </div>
    </div>

    <!-- Modal pour l'ajout de balance -->
    <div *ngIf="showAddBalanceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-lg mx-4">
        <div class="flex justify-end p-2">
          <button class="text-gray-500 hover:text-gray-700" (click)="showAddBalanceModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <app-add-balance></app-add-balance>
      </div>
    </div>
  `
})
export class QuickCreateComponent {
  showCreateAgentModal = false;
  showAddBalanceModal = false;

  actions = [
    {
      id: 'create-user',
      label: 'Nouvel utilisateur',
      colorClass: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
      icon: 'fas fa-user-plus',
      buttonClass: ''
    },
    {
      id: 'add-balance',
      label: 'Ajouter balance',
      colorClass: 'bg-green-50 hover:bg-green-100 text-green-600',
      icon: 'fas fa-wallet',
      buttonClass: ''
    }
    // Vous pouvez ajouter d'autres actions ici...
  ];

  handleActionClick(actionId: string) {
    switch (actionId) {
      case 'create-user':
        this.showCreateAgentModal = true;
        break;
      case 'add-balance':
        this.showAddBalanceModal = true;
        break;
    }
  }
}
