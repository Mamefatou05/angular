import { Component, Input } from '@angular/core';
import {CurrencyPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [
    NgClass,
    CurrencyPipe
  ],

  template: `
    <div class="bg-white rounded-xl shadow-md p-4 md:p-6">
      <div class="flex items-center">
        <div class="p-3" [ngClass]="bgColorClass" [class]="iconBgClass">
          <ng-content></ng-content> <!-- Permet d'insérer des SVGs spécifiques -->
        </div>
        <div class="ml-4">
          <h2 class="text-gray-600 text-sm">{{ title }}</h2>
          <p class="text-2xl font-semibold">{{ value | currency:currencyCode }}</p>
        </div>
      </div>
    </div>
  `
})
export class StatCardComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() bgColorClass = 'bg-gray-100';
  @Input() currencyCode = 'EUR';
  @Input() iconBgClass = ''; // Pour ajouter des styles conditionnels
}
