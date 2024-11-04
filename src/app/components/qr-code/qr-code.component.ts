import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { TransferComponent } from '../transfert/transfer.component';

import { BarcodeFormat } from '@zxing/library';
import { trigger, transition, style, animate } from '@angular/animations';
import {TransferFormData} from '../../models/transaction.model';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QRCodeModule, ZXingScannerModule, NgIf, TransferComponent],
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
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
  toggleQRCodeOrScanner() {
    // Si le QR code est affiché, alors on bascule sur le scanner
    if (this.showQRCode) {
      this.showQRCode = false;
      this.showScanner = true;
    } else {
      this.showScanner = false;
      this.showQRCode = true;
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
