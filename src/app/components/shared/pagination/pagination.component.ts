import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <!-- Version mobile -->
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          (click)="onPageChange(currentPage - 1)"
          [disabled]="currentPage === 1"
          class="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold
                 ring-1 ring-inset ring-gray-300 hover:bg-gray-50
                 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button
          (click)="onPageChange(currentPage + 1)"
          [disabled]="currentPage === totalPages"
          class="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold
                 ring-1 ring-inset ring-gray-300 hover:bg-gray-50
                 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>

      <!-- Version desktop -->
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Affichage de
            <span class="font-medium">{{ startIndex + 1 }}</span>
            à
            <span class="font-medium">{{ endIndex }}</span>
            sur
            <span class="font-medium">{{ totalItems }}</span>
            résultats
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <!-- Bouton précédent -->
            <button
              (click)="onPageChange(currentPage - 1)"
              [disabled]="currentPage === 1"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300
                     hover:bg-gray-50 focus:z-20 focus:outline-offset-0
                     disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Précédent</span>
              <i class="fas fa-chevron-left h-5 w-5"></i>
            </button>

            <!-- Pages numérotées -->
            <ng-container *ngFor="let page of visiblePages">
              <ng-container *ngIf="page !== '...'">
                <button
                  (click)="pageChangeIfNumber(page)"
                  [class]="getPageButtonClass(page)"
                  [attr.aria-current]="page === currentPage ? 'page' : null"
                >
                  {{ page }}
                </button>
              </ng-container>
              <span *ngIf="page === '...'"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                ...
              </span>
            </ng-container>

            <!-- Bouton suivant -->
            <button
              (click)="onPageChange(currentPage + 1)"
              [disabled]="currentPage === totalPages"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300
                     hover:bg-gray-50 focus:z-20 focus:outline-offset-0
                     disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Suivant</span>
              <i class="fas fa-chevron-right h-5 w-5"></i>
            </button>
          </nav>
        </div>
      </div>
    </div>
  `
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() startIndex: number = 0;
  @Input() endIndex: number = 0;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();


  get visiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];

    if (this.totalPages <= 7) {
      // Si moins de 7 pages, afficher toutes les pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Toujours afficher la première page
      pages.push(1);

      if (this.currentPage <= 3) {
        // Si près du début
        pages.push(2, 3, 4, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        // Si près de la fin
        pages.push('...', this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        // Au milieu
        pages.push('...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }

    return pages;
  }

  // Update the method signature to accept both number and string
  getPageButtonClass(page: number | string): string {
    // Skip styling for ellipsis
    if (page === '...') {
      return 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300';
    }

    const baseClass = 'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20';

    if (page === this.currentPage) {
      return `${baseClass} z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-blue-600`;
    }

    return `${baseClass} text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0`;
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
  pageChangeIfNumber(page: number | string): void {
    if (typeof page === 'number') {
      this.onPageChange(page);
    }
  }

}
