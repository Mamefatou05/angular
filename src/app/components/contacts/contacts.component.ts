import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import {User} from '../../models/user.model';
import { ContactService } from '../../services/contact.service';
import { TransferComponent } from '../transfert/transfer.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TransferComponent],
  template: `
    <div>

      <div>
        <div class="flex justify-between items-center mb-4">
          <button
            *ngIf="!showAllContacts "
            (click)="showAllContacts = true"
            class="text-blue-600 text-sm">
            See All
          </button>
        </div>

        <div class="flex space-x-4">
          <!-- Bouton d'ajout -->
          <div class="flex flex-col items-center">
            <button
              (click)="showAddContactModal = true"
              class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2 hover:bg-gray-200 transition-colors">
              <i class="fas fa-plus text-gray-600"></i>
            </button>
            <span class="text-xs text-gray-600">Add</span>
          </div>

          <!-- Liste des contacts -->
          <div *ngFor="let contact of displayedContacts"
               (click)="openTransferForm(contact)"
               class="flex flex-col items-center">
            <div class="relative mb-2">
              <div class="w-12 h-12 rounded-full overflow-hidden">
                <img
                  *ngIf="contact.contact?.photo"
                  [src]="contact.contact?.photo"
                  [alt]="contact.nickname || contact.contact?.firstName"
                  class="w-full h-full object-cover border-2 border-white"
                >
                <div
                  *ngIf="!contact.contact?.photo"
                  class="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm">
                  {{getInitials(contact)}}
                </div>
              </div>
              <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <span class="text-xs text-gray-600">
        {{contact.nickname || getFullName(contact.contact)}}
      </span>
          </div>
        </div>
      </div>

      <!-- Bouton "Voir plus" -->

      <!-- Modal d'ajout de contact -->
      <div *ngIf="showAddContactModal"
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold">Add New Contact</h3>
            <button
              (click)="showAddContactModal = false"
              class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form (ngSubmit)="addContact()" #contactForm="ngForm">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  [(ngModel)]="newContact.phone"
                  name="phone"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nickname</label>
                <input
                  type="text"
                  [(ngModel)]="newContact.nickname"
                  name="nickname"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter nickname">
              </div>
              <button
                type="submit"
                [disabled]="!contactForm.valid"
                class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                Add Contact
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Composant de transfert -->
      <app-transfer
        *ngIf="showTransferForm"
        [receiverPhoneNumber]="selectedContact?.contact?.phoneNumber || ''"
        (onClose)="closeTransferForm()"
        (onSuccess)="handleTransferSuccess($event)">
      </app-transfer>
    </div>
  `
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  displayedContacts: Contact[] = [];
  showAllContacts = false;
  showAddContactModal = false;
  showTransferForm = false;
  selectedContact: Contact | null = null;

  newContact = {
    phone: '',
    nickname: ''
  };

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.loadContacts();
  }

  getInitials(contact: Contact): string {
    if (contact.nickname) {
      return contact.nickname.charAt(0).toUpperCase();
    }

    if (contact.contact) {
      if (contact.contact.firstName && contact.contact.lastName) {
        return (contact.contact.firstName.charAt(0) + contact.contact.lastName.charAt(0)).toUpperCase();
      }
      if (contact.contact.firstName) {
        return contact.contact.firstName.charAt(0).toUpperCase();
      }
      return contact.contact.phoneNumber.charAt(0);
    }

    return '#';
  }

  getFullName(user: User | undefined): string {
    if (!user) return '';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
      return user.firstName;
    }
    return user.phoneNumber;
  }

  loadContacts() {
    this.contactService.getContacts().subscribe({
      next: (response) => {
        this.contacts = response.data;
        this.updateDisplayedContacts();
      },
      error: (error) => console.error('Erreur lors du chargement des contacts:', error)
    });
  }

  updateDisplayedContacts() {
    this.displayedContacts = this.showAllContacts
      ? this.contacts
      : this.contacts.slice(0, 5);
  }

  openTransferForm(contact: Contact) {
    this.selectedContact = contact;
    this.showTransferForm = true;
  }

  closeTransferForm() {
    this.showTransferForm = false;
    this.selectedContact = null;
  }

  handleTransferSuccess(transferData: any) {
    this.closeTransferForm();
  }

  addContact() {
    this.contactService.createContactByPhone(
      this.newContact.phone,
      this.newContact.nickname
    ).subscribe({
      next: () => {
        this.loadContacts();
        this.showAddContactModal = false;
        this.newContact = { phone: '', nickname: '' };
      },
      error: (error) => console.error('Erreur lors de l\'ajout du contact:', error)
    });
  }
}
