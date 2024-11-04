import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class=" bg-gray-50">
      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <!-- Background Gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90"></div>

        <!-- Content -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <h1 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span class="block">Transfert d'argent simple</span>
              <span class="block text-indigo-200">et sécurisé</span>
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Envoyez de l'argent instantanément à vos proches en toute sécurité.
              Profitez de nos tarifs compétitifs et de notre service client disponible 24/7.
            </p>

            <!-- Action Buttons -->
            <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <button
                  (click)="router.navigate(['/login'])"
                  class="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10">
                  Se Connecter
                </button>
                <button
                  (click)="router.navigate(['/demande'])"
                  class="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Créer un compte
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div class="relative bg-white py-16 sm:py-24">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <!-- Feature 1 -->
              <div class="text-center">
                <div class="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-500 mx-auto">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="mt-6 text-lg font-medium text-gray-900">Transferts Instantanés</h3>
                <p class="mt-2 text-base text-gray-500">
                  Envoyez de l'argent en quelques secondes, 24/7
                </p>
              </div>

              <!-- Feature 2 -->
              <div class="text-center">
                <div class="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-500 mx-auto">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 class="mt-6 text-lg font-medium text-gray-900">100% Sécurisé</h3>
                <p class="mt-2 text-base text-gray-500">
                  Vos transactions sont protégées et cryptées
                </p>
              </div>

              <!-- Feature 3 -->
              <div class="text-center">
                <div class="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-500 mx-auto">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 class="mt-6 text-lg font-medium text-gray-900">Tarifs Compétitifs</h3>
                <p class="mt-2 text-base text-gray-500">
                  Les meilleurs taux du marché pour vos transferts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  constructor(public router: Router) {}
}
