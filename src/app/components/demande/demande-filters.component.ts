import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountRequestStatus } from "../../models/demande.model";

@Component({
    selector: 'app-demande-filters',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="flex flex-wrap gap-4 items-center">
            <div class="flex gap-2">
                <button
                        *ngFor="let status of filterStatuses"
                        (click)="onFilterChange(status)"
                        [class]="getFilterButtonClass(status)">
                    {{ getStatusLabel(status) }}
                </button>
            </div>

            <button
                    (click)="processApproved.emit()"
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Traiter les approuvées
            </button>
        </div>
    `
})
export class DemandeFiltersComponent {
    @Input() currentFilter!: AccountRequestStatus | 'ALL';
    @Input() filterStatuses!: (AccountRequestStatus | 'ALL')[];
    @Output() filterChange = new EventEmitter<AccountRequestStatus | 'ALL'>();
    @Output() processApproved = new EventEmitter<void>();



    onFilterChange(status: AccountRequestStatus | 'ALL'): void {
        this.filterChange.emit(status);
    }

    getStatusLabel(status: AccountRequestStatus | 'ALL'): string {
        switch (status) {
            case 'ALL':
                return 'Tous';
            case 'PENDING':
                return 'En attente';
            case 'APPROVED':
                return 'Approuvé';
            case 'REJECTED':
                return 'Rejeté';
            default:
                return status;
        }
    }

    getStatusClass(status: AccountRequestStatus): string {
        const baseClasses = 'px-4 py-2 rounded-lg transition-colors';

        switch (status) {
            case 'PENDING':
                return `${baseClasses} bg-yellow-500 text-white`;
            case 'APPROVED':
                return `${baseClasses} bg-green-500 text-white`;
            case 'REJECTED':
                return `${baseClasses} bg-red-500 text-white`;
            default:
                return `${baseClasses} bg-gray-500 text-white`;
        }
    }

    getFilterButtonClass(status: AccountRequestStatus | 'ALL'): string {
        const baseClasses = 'px-4 py-2 rounded-lg transition-colors';

        if (status === 'ALL') {
            return this.currentFilter === status
                ? `${baseClasses} bg-gray-800 text-white`
                : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
        }

        const statusClass = this.getStatusClass(status);
        const isActive = this.currentFilter === status;

        return isActive
            ? statusClass
            : `${statusClass} bg-opacity-50 hover:bg-opacity-75`;
    }
}
