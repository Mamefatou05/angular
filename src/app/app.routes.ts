import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { DemandeComponent } from './components/auth/demande.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import {DemandeListComponent} from './components/demande/demande-list.component';
import {AllTransactionsComponent} from './components/all-transactions/all-transactions.component';
import {EditProfileComponent} from './components/profile/edit-profile.component';
import {HomeComponent} from './components/home.component';
import {TransferComponent} from './components/transfert/transfer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Nouvelle route par défaut
  { path: 'login', component: LoginComponent },
  { path: 'demande', component: DemandeComponent },
  { path: 'demandelist', component: DemandeListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboardAdmin', component: DashboardAdminComponent },
  { path: 'transactions', component: AllTransactionsComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'transfer', component: TransferComponent }  // Ajoutez cette ligne pour la route du transfert
];
