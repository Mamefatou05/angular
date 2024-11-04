import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccountRequestStatus, Demande} from '../../models/demande.model';
import {CommonModule} from '@angular/common';

interface StatusUpdateEvent {
  id: string;
  status: AccountRequestStatus;
}

@Component({
  selector: 'app-demande-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
          <th scope="col" class="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th scope="col" class="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let demande of demandes"
            class="hover:bg-gray-50 transition-colors">
          <td class="px-4 py-3 whitespace-nowrap" (click)="demandeClick.emit(demande)">
            <div class="text-sm font-medium text-gray-900">
              {{ demande.firstName }} {{ demande.lastName }}
            </div>
            <div class="md:hidden text-sm text-gray-500">{{ demande.email }}</div>
          </td>
          <td class="hidden md:table-cell px-4 py-3 whitespace-nowrap" (click)="demandeClick.emit(demande)">
            <div class="text-sm text-gray-500">{{ demande.email }}</div>
          </td>
          <td class="hidden lg:table-cell px-4 py-3 whitespace-nowrap" (click)="demandeClick.emit(demande)">
            <div class="text-sm text-gray-500">{{ demande.phoneNumber }}</div>
          </td>
          <td class="px-4 py-3 whitespace-nowrap" (click)="demandeClick.emit(demande)">
            <span [class]="getStatusClass(demande.status)">{{ demande.status }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class DemandeTableComponent {
  @Input() demandes!: Demande[];
  @Output() demandeClick = new EventEmitter<Demande>();
  @Output() statusUpdate = new EventEmitter<StatusUpdateEvent>();

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
