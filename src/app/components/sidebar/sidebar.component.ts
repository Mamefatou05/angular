import { Component, HostListener, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
import {User, UserRole} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {firstValueFrom} from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  isSmallScreen = false;
  activeLink: string = '';
  menuItems: MenuItem[] = [];
  user: User | null = null;

  clientMenuItems: MenuItem[] = [
    { label: 'Accueil', icon: 'fa-home', link: '/dashboard' },
    { label: 'Transfert', icon: 'fa-exchange-alt', link: '/transfer' },
    { label: 'Historique', icon: 'fa-history', link: '/transactions' },
    { label: 'Profil', icon: 'fa-user', link: '/profile' }
  ];

  adminMenuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'fa-chart-line', link: '/dashboard' },
    { label: 'Utilisateurs', icon: 'fa-users', link: '/admin/users' },
    { label: 'Transactions', icon: 'fa-coins', link: '/transactions' },
    { label: 'Demande', icon: 'fa-cogs', link: '/demandelist' }
  ];

  constructor(private apiService: ApiService, private router: Router, private userService: UserService) {}

  async ngOnInit() {
    this.setMenuItems();
    this.activeLink = this.router.url;
    try {
      const userResponse = await firstValueFrom(this.userService.getCurrentUser());
      this.user = userResponse.data; // Extrayez l'utilisateur de `data`
    } catch (error) {
      console.error('Erreur lors de la récupération de l’utilisateur:', error);
      // Gérer l'erreur de récupération, comme rediriger vers la page de connexion
    }

  }
  setMenuItems() {
    this.menuItems = this.apiService.isClient() ? this.clientMenuItems : this.adminMenuItems;

  }
  getLinkClasses(link: string): string {
    const baseClasses = 'group relative px-8 py-3 text-sm no-underline transition-colors';
    const activeClasses = 'bg-white text-blue-600 rounded-l-2xl';
    const inactiveClasses = 'text-white hover:text-blue-600 hover:bg-white hover:rounded-l-2xl';

    return `${baseClasses} ${this.activeLink === link ? activeClasses : inactiveClasses}`;
  }

  getRoleBadgeClass(role: string): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (role) {
      case UserRole.ADMIN:
        return `${baseClasses} bg-red-100 text-red-800`;
      case UserRole.AGENT:
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case UserRole.CLIENT:
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getKycStatusBadgeClass(status: string): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'VERIFIED':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'PENDING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'REJECTED':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }


  logout() {
    this.router.navigate(['/']);
  }
}
