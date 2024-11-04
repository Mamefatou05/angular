import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountRequestStatus, Demande} from '../../models/demande.model';

@Component({
  selector: 'app-demande-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Informations principales -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Informations personnelles</h3>
          <div class="space-y-3">
            <div>
              <label class="text-sm text-gray-500">Nom complet</label>
              <p class="font-medium">{{ demande.firstName }} {{ demande.lastName }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500">Email</label>
              <p class="font-medium">{{ demande.email }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500">Téléphone</label>
              <p class="font-medium">{{ demande.phoneNumber }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">État de la demande</h3>
          <div class="space-y-3">
            <div>
              <label class="text-sm text-gray-500">Statut actuel</label>
              <span [class]="getStatusClass(demande.status)" class="mt-1 inline-block">
                {{ demande.status }}
              </span>
            </div>
            <div>
              <label class="text-sm text-gray-500">Date de création</label>
              <p class="font-medium">{{ demande.createdAt | date:'medium' }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500">Dernière mise à jour</label>
              <p class="font-medium">{{ demande.updatedAt | date:'medium' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Documents -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Documents d'identité</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-sm font-medium text-gray-500 mb-2">Recto de la carte d'identité</h4>
            <div class="bg-gray-200 rounded-lg overflow-hidden">
              <img [src]="demande.idCardFrontPhoto" alt="Recto carte d'identité" class="w-full h-full object-contain">
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-500 mb-2">Verso de la carte d'identité</h4>
            <div class="bg-gray-200 rounded-lg  overflow-hidden">
              <img [src]="demande.idCardBackPhoto" alt="Verso carte d'identité" class="w-full h-full object-contain">
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-4 mt-6" *ngIf="demande.status === 'PENDING'">
        <button
          (click)="onStatusUpdate(demande.id!, AccountRequestStatus.REJECTED)"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors
                 flex items-center gap-2">
          <i class="fas fa-times"></i>
          Rejeter la demande
        </button>
        <button
          (click)="onStatusUpdate(demande.id!, AccountRequestStatus.APPROVED)"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors
                 flex items-center gap-2">
          <i class="fas fa-check"></i>
          Approuver la demande
        </button>
      </div>
    </div>
  `
})
export class DemandeDetailComponent {
  @Input() demande!: Demande;
  @Output() statusUpdate = new EventEmitter<{id: string, status: AccountRequestStatus}>();

  protected readonly AccountRequestStatus = AccountRequestStatus;

  onStatusUpdate(id: string, status: AccountRequestStatus) {
    this.statusUpdate.emit({ id, status });
  }

  getStatusClass(status: AccountRequestStatus): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case AccountRequestStatus.PENDING:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case AccountRequestStatus.APPROVED:
        return `${baseClasses} bg-green-100 text-green-800`;
      case AccountRequestStatus.REJECTED:
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }
}
