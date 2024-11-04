import { Component, Input } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DatePipe
  ],
  template: `
    <div class="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 p-2 md:space-y-0">
      <div class="text-xs md:text-sm text-gray-500">
        Dernière mise à jour: {{ now | date:'dd/MM/yyyy HH:mm' }}
      </div>
    </div>
  `
})
export class HeaderComponent {
  @Input() now!: Date;
}
