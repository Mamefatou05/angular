import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { TransferComponent, TransferFormData } from '../transfert/transfer.component';
import { BarcodeFormat } from '@zxing/library';


@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QRCodeModule, ZXingScannerModule, NgIf, TransferComponent],
  template: `
    <div class="flex flex-col items-center justify-center space-y-4">
      <!-- Boutons d'action -->
      <div class="flex space-x-4">
        <button
          (click)="toggleQRCode()"
          class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clip-rule="evenodd" />
          </svg>
          <span>QR Code</span>
        </button>

        <button
          (click)="toggleScanner()"
          class="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm3 2h6l-3 3-3-3z" clip-rule="evenodd" />
          </svg>
          <span>Scanner</span>
        </button>

        <button
          (click)="showTransferModal()"
          class="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
          </svg>
          <span>Transfert Direct</span>
        </button>
      </div>

      <!-- QR Code Modal -->
      <div *ngIf="showQRCode" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Votre QR Code</h3>
            <button (click)="toggleQRCode()" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <qrcode
            [qrdata]="qrData"
            [width]="200"
            [errorCorrectionLevel]="'M'"
            [margin]="2">
          </qrcode>
        </div>
      </div>

      <!-- Scanner Modal -->
      <div *ngIf="showScanner" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Scanner un QR Code</h3>
            <button (click)="toggleScanner()" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <zxing-scanner
            (scanSuccess)="onCodeScanned($event)"
            [formats]="[BarcodeFormat.QR_CODE]"
          ></zxing-scanner>

        </div>
      </div>

      <!-- Composant de transfert -->
      <app-transfer
        *ngIf="showTransfer"
        [receiverPhone]="scannedPhone"
        [editablePhone]="isDirectTransfer"
        (onClose)="closeTransfer()"
        (onSuccess)="onTransferSuccess($event)"
      ></app-transfer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    zxing-scanner {
      width: 300px;
      height: 300px;
      border-radius: 8px;
      overflow: hidden;
    }
  `]
})
export class QrCodeComponent implements OnInit {
  qrData: string = '';
  showQRCode: boolean = false;
  showScanner: boolean = false;
  showTransfer: boolean = false;
  scannedPhone: string = '';
  isDirectTransfer: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (response) => {
        if (response.data?.wallets?.[0]) {
          if (response.data.wallets) {
            this.qrData = response.data.wallets[0].qrCode;
          }
        }
      },
      error: (error) => console.error('Erreur:', error)
    });
  }

  toggleQRCode() {
    this.showQRCode = !this.showQRCode;
    if (this.showQRCode) {
      this.showScanner = false;
      this.showTransfer = false;
    }
  }

  toggleScanner() {
    this.showScanner = !this.showScanner;
    if (this.showScanner) {
      this.showQRCode = false;
      this.showTransfer = false;
    }
  }

  showTransferModal() {
    this.showTransfer = true;
    this.isDirectTransfer = true;
    this.scannedPhone = '';
    this.showQRCode = false;
    this.showScanner = false;
  }

  onCodeScanned(resultString: string) {
    this.showScanner = false;
    const phoneNumber = resultString.split('wave.com/')[1];
    this.scannedPhone = phoneNumber;
    this.isDirectTransfer = false;
    this.showTransfer = true;
  }

  closeTransfer() {
    this.showTransfer = false;
    this.scannedPhone = '';
    this.isDirectTransfer = false;
  }

  onTransferSuccess(data: TransferFormData) {
    console.log('Transfert réussi:', data);
    // Gérer le succès du transfert (notifications, redirections, etc.)
    this.closeTransfer();
  }

  protected readonly BarcodeFormat = BarcodeFormat;
}
