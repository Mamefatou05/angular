import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeService } from '../../services/demande.service';
import { ProcessService } from '../../services/process.service';
import { Demande, AccountRequestStatus } from '../../models/demande.model';
import { DemandeDetailComponent } from './demande-detail.component';
import { DemandeTableComponent } from './demande-table.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { DemandeFiltersComponent } from './demande-filters.component';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [
    CommonModule,
    DemandeDetailComponent,
    DemandeTableComponent,
    PaginationComponent,
    DemandeFiltersComponent
  ],
  template: `
    <div class="bg-gray-100 p-6">
      <div class="mx-auto">
        <div class="bg-white shadow-xl rounded-lg overflow-hidden mb-6">
          <div class="p-6">
            <!-- En-tête -->
            <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h2 class="text-2xl font-bold text-gray-800">
                {{ selectedDemande ? 'Détails de la demande' : 'Gestion des demandes' }}
              </h2>

              <!-- Filtres -->
              <app-demande-filters
                *ngIf="!selectedDemande"
                [currentFilter]="currentStatusFilter"
                [filterStatuses]="filterStatuses"
                (filterChange)="setStatusFilter($event)"
                (processApproved)="processApprovedRequests()">
              </app-demande-filters>

              <!-- Bouton retour -->
              <button
                *ngIf="selectedDemande"
                (click)="clearSelectedDemande()"
                class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>
                Retour à la liste
              </button>
            </div>

            <!-- Loading state -->
            <div *ngIf="isLoading" class="flex justify-center items-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>

            <!-- Error state -->
            <div *ngIf="error"
                 class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span class="block sm:inline">{{ error }}</span>
              <button
                (click)="dismissError()"
                class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <span class="sr-only">Fermer</span>
                <svg class="h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                </svg>
              </button>
            </div>

            <!-- Messages de succès -->
            <div *ngIf="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <span class="block sm:inline">{{ successMessage }}</span>
              <button (click)="successMessage = null" class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <span class="sr-only">Fermer</span>
                <svg class="h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                </svg>
              </button>
            </div>

            <!-- Messages d'erreur -->
            <div *ngIf="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span class="block sm:inline">{{ errorMessage }}</span>
              <button (click)="errorMessage = null" class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <span class="sr-only">Fermer</span>
                <svg class="h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                </svg>
              </button>
            </div>


            <!-- Content -->
            <ng-container *ngIf="!isLoading">
              <!-- Vue Liste -->
              <ng-container *ngIf="!selectedDemande">
                <app-demande-table
                  [demandes]="paginatedDemandes"
                  (demandeClick)="selectDemande($event)"
                  (statusUpdate)="updateStatus($event.id, $event.status)">
                </app-demande-table>


                <app-pagination
                  *ngIf="filteredDemandes.length > 0"
                  [currentPage]="currentPage"
                  [totalPages]="totalPages"
                  [startIndex]="startIndex"
                  [endIndex]="endIndex"
                  [totalItems]="filteredDemandes.length"
                  (pageChange)="goToPage($event)">
                </app-pagination>

                <div *ngIf="filteredDemandes.length === 0"
                     class="text-center py-8 text-gray-500">
                  Aucune demande ne correspond aux critères de filtrage.
                </div>
              </ng-container>

              <!-- Vue Détail -->
              <app-demande-detail
                *ngIf="selectedDemande"
                [demande]="selectedDemande"
                (statusUpdate)="updateStatus($event.id, $event.status)">
              </app-demande-detail>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DemandeListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  successMessage: string | null = null;
  errorMessage: string | null = null;

  demandes: Demande[] = [];
  selectedDemande: Demande | null = null;
  currentStatusFilter: AccountRequestStatus | 'ALL' = 'ALL';
  isLoading: boolean = false;
  error: string | null = null;

  // Pagination
  readonly pageSize: number = 10;
  currentPage: number = 1;

  // Filtres
  readonly filterStatuses: (AccountRequestStatus | 'ALL')[] = [
    'ALL',
    AccountRequestStatus.PENDING,
    AccountRequestStatus.APPROVED,
    AccountRequestStatus.REJECTED
  ];

  constructor(
    private demandeService: DemandeService,
    private processService: ProcessService
  ) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDemandes(): void {
    this.isLoading = true;
    this.error = null;

    this.demandeService.listDemandes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.demandes = response.data;
          // Reset page if current page would be empty
          if (this.currentPage > this.totalPages) {
            this.currentPage = 1;
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement des demandes. Veuillez réessayer.';
          this.isLoading = false;
          console.error('Erreur lors du chargement des demandes', error);
        }
      });
  }

  dismissError(): void {
    this.error = null;
  }

  // Filtrage
  get filteredDemandes(): Demande[] {
    if (this.currentStatusFilter === 'ALL') {
      return this.demandes;
    }
    return this.demandes.filter(demande => demande.status === this.currentStatusFilter);
  }

  // Pagination
  get paginatedDemandes(): Demande[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredDemandes.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredDemandes.length / this.pageSize));
  }

  get startIndex(): number {
    return Math.min((this.currentPage - 1) * this.pageSize, this.filteredDemandes.length);
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filteredDemandes.length);
  }

  // Actions
  selectDemande(demande: Demande): void {
    this.selectedDemande = { ...demande };  // Create a copy to avoid direct mutations
  }

  clearSelectedDemande(): void {
    this.selectedDemande = null;
  }

  setStatusFilter(status: AccountRequestStatus | 'ALL'): void {
    this.currentStatusFilter = status;
    this.currentPage = 1;  // Reset to first page when filter changes
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  updateStatus(demandeId: string, newStatus: AccountRequestStatus): void {
    this.isLoading = true;
    this.error = null;

    this.demandeService.updateStatus(demandeId, newStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // Mise à jour locale de la demande
          this.demandes = this.demandes.map(demande =>
            demande.id === demandeId
              ? { ...demande, status: newStatus, updatedAt: new Date() }
              : demande
          );

          // Mise à jour de la demande sélectionnée si nécessaire
          if (this.selectedDemande?.id === demandeId) {
            this.selectedDemande = {
              ...this.selectedDemande,
              status: newStatus,
              updatedAt: new Date()
            };
          }

          this.isLoading = false;
          this.successMessage = "Le statut a été mis à jour avec succès.";

        },
        error: (error) => {
          this.error = 'Erreur lors de la mise à jour du statut. Veuillez réessayer.';
          this.isLoading = false;
          this.errorMessage = "Erreur lors de la mise à jour du statut. Veuillez réessayer.";

          console.error('Erreur lors de la mise à jour du statut', error);
        }
      });
  }
  processApprovedRequests(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.processService.processDemande()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.successMessage = "Les demandes approuvées ont été traitées avec succès.";
          this.loadDemandes(); // Recharge la liste après traitement
        },
        error: (error) => {
          this.errorMessage = "Erreur lors du traitement des demandes approuvées. Veuillez réessayer.";
          this.isLoading = false;
          console.error('Erreur lors du traitement des demandes approuvées', error);
        }
      });
  }

}
