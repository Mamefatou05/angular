import {Component, OnInit} from '@angular/core';
import {WalletService} from '../../../services/wallet.service';
import {TransactionService} from '../../../services/transaction.service';
import {ContactService} from '../../../services/contact.service';
import {UserService} from '../../../services/user.service';
import {forkJoin} from 'rxjs';
import {TransactionListComponent} from '../../transaction/transaction-list/transaction-list.component';
import {ContactsComponent} from '../../contacts/contacts.component';
import {WalletComponent} from '../../wallet/wallet.component';
import {NgIf} from '@angular/common';
import {QrCodeComponent} from '../../qr-code/qr-code.component';
import {TransferButtonComponent} from '../../transfert/bouton-transfert.component';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  standalone:true,
  imports: [
    TransactionListComponent,
    ContactsComponent,
    WalletComponent,
    NgIf,
    QrCodeComponent,
    TransferButtonComponent,
  ],
})
export class DashboardClientComponent implements OnInit {
  loading = true;
  error: string | null = null;
  constructor(
    private walletService: WalletService,
    private transactionService: TransactionService,
    private contactService: ContactService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    const currentUser$ = this.userService.getCurrentUser();
    const wallet$ = this.walletService.getUserWallet();
    const transactions$ = this.transactionService.getAllTransactionsByUser('current');
    const contacts$ = this.contactService.getContacts();

    forkJoin({
      user: currentUser$,
      wallet: wallet$,
      transactions: transactions$,
      contacts: contacts$
    }).subscribe({
      next: (data) => {
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des données';
        this.loading = false;
      }
    });
  }
}
