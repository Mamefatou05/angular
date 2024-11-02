import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NgIf],
  template: `
    <router-outlet></router-outlet>
    <!-- Afficher le footer seulement si on n'est pas sur la route /login -->
    <app-footer *ngIf="!isLoginPage"></app-footer>
  `
})
export class AppComponent {
  isLoginPage = false;

  constructor(private router: Router) {
    // Écouter les changements de route
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });
  }
}
