import {Component, HostListener} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NgIf } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {HomeComponent} from './components/home.component';
import {LoginComponent} from './components/auth/login.component';
import {DemandeComponent} from './components/auth/demande.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NgIf, SidebarComponent],
  template: `
    <div class="app-container  flex"> <!-- Ajout de flex et min-h-screen -->
      <app-sidebar *ngIf="!isExcludedRoute && isMenuOpen"></app-sidebar>
      <!-- Contenu principal -->
      <div class="flex-1"> <!-- Conteneur pour le router outlet -->
        <router-outlet></router-outlet>
      </div>
    </div>
    <!-- Overlay pour mobile -->
    <div *ngIf="isMenuOpen && isSmallScreen" (click)="toggleMenu()" class="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>

    <!-- Bouton hamburger -->
    <button
      (click)="toggleMenu()"
      class="fixed top-4 right-4 z-50 p-2 rounded-lg bg-blue-500 text-white lg:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path *ngIf="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        <path *ngIf="isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  `,
  styles: [`
  `]
})
export class AppComponent {
  isExcludedRoute = false;
  isMenuOpen = false;
  isSmallScreen = false;

  // Liste des routes où le Sidebar ne doit pas être affiché
  excludedRoutes: string[] = ['/', '/login', '/demande'];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Vérifie si la route actuelle est dans excludedRoutes
      this.isExcludedRoute = this.excludedRoutes.includes(this.router.url);
    });
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 1024;
    // Ferme le menu si on passe en petit écran
    if (this.isSmallScreen) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true; // Garde le menu ouvert si l'écran est grand
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
