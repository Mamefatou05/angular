import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  template: `
    <div class="bg-white rounded-xl shadow-md p-4 md:p-6">
      <h2 class="text-lg md:text-xl font-semibold mb-4">Actions rapides</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        <button *ngFor="let action of actions"
                [class]="action.buttonClass"
                class="p-3 md:p-4 rounded-lg flex flex-col items-center transition-colors"
                [ngClass]="action.colorClass"
        >
          <ng-container *ngIf="action.icon">
            <i [class]="action.icon" class="h-6 w-6 md:h-8 md:w-8 mb-2"></i>
          </ng-container>
          <span class="text-xs md:text-sm">{{ action.label }}</span>
        </button>
      </div>
    </div>
  `
})
export class QuickActionsComponent {
  actions = [
    {
      label: 'Nouvel utilisateur',
      colorClass: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
      icon: 'fas fa-user-plus', // Assurez-vous d'utiliser la classe correcte pour l'icône
      buttonClass: '' // Mettre une valeur par défaut
    },
    // Ajouter d'autres actions ici...
  ];
}
