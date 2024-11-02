import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { QrCodeComponent } from '../qr-code/qr-code.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, QrCodeComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  phone: string = '';
  password: string = '';
  showQRCode: boolean = false;
  userId: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onLogin(event: Event) {
    event.preventDefault();
    this.isLoading = true;

    const credentials = {
      phone: this.phone,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => this.handleLoginResponse(response),
      error: (error: HttpErrorResponse) => this.handleError(error),
    });
  }

  private handleLoginResponse(response: any) {
    this.isLoading = false;

    if (!response.error) {
      // La connexion a réussi, redirige vers le tableau de bord
      this.router.navigate(['/dashboard']).then(
        (success) => {
          if (!success) {
            console.error('La navigation a échoué - Route non trouvée ou non accessible');
          }
        },
        (error) => {
          console.error('Erreur lors de la navigation:', error);
        }
      );
    } else {
      this.showError(response.message || 'Erreur lors de la connexion');
    }
  }

  private handleError(error: HttpErrorResponse) {
    this.isLoading = false;
    this.showQRCode = false;

    let errorMessage = 'Une erreur est survenue';

    if (error.status === 0) {
      errorMessage = 'Impossible de contacter le serveur';
    } else if (error.status === 401) {
      errorMessage = 'Identifiants incorrects';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    this.showError(errorMessage);
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  onCloseQR() {
    this.showQRCode = false;
    this.router.navigate(['/dashboard'])
      .then(() => console.log('Navigation après fermeture QR réussie'))
      .catch(err => console.error('Erreur navigation après QR:', err));
  }

  onRegister() {
    this.router.navigate(['/register'])
      .then(() => console.log('Navigation vers register réussie'))
      .catch(err => console.error('Erreur navigation vers register:', err));
  }
}
