import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { StatCardComponent } from './component/stat-card.component';
import { QuickActionsComponent } from './component/quick-actions.component';
import { HeaderComponent } from './component/header.component';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    StatCardComponent,
    QuickActionsComponent,
    HeaderComponent
  ]
})
export class DashboardAdminComponent {
  now = new Date();

  // Initialisation des statistiques
  stats = {
    totalUsers: 0,
    activeUsers: 0,
    totalTransactions: 0,
    revenue: 0
  };

  // Initialisation de la propriété loading
  loading: boolean = true; // Mettre à true si le chargement est en cours

  constructor() {
    // Simuler le chargement des données
    this.loadStats();
  }

  loadStats() {
    // Simuler un délai de chargement (remplacez ceci par votre logique réelle)
    setTimeout(() => {
      this.stats = {
        totalUsers: 100,
        activeUsers: 75,
        totalTransactions: 50,
        revenue: 2000
      };
      this.loading = false; // Indique que le chargement est terminé
    }, 2000);
  }
}
