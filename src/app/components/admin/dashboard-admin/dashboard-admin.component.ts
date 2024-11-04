import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { StatCardComponent } from './component/stat-card.component';
import { QuickCreateComponent } from '../../quick-actions/create/quick-create.component';
import { HeaderComponent } from './component/header.component';
import {TransactionListComponent} from '../../transaction/transaction-list/transaction-list.component';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    StatCardComponent,
    QuickCreateComponent,
    HeaderComponent,
    TransactionListComponent
  ]
})
export class DashboardAdminComponent {
  now = new Date();

  // Initialisation des statistiques
  stats = {
    totalUsers: 0,
    activeUsers: 0,
    totalTransactions: 0,
    totalAgent: 0
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
        totalAgent: 10
      };
      this.loading = false; // Indique que le chargement est terminé
    }, 2000);
  }
}
