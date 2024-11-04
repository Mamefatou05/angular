import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserRole } from '../../models/user-role.enum';
import {DashboardAdminComponent} from '../admin/dashboard-admin/dashboard-admin.component';
import {DashboardClientComponent} from '../client/dashboard/dashboard-client.component';
import {NgIf} from '@angular/common';
import {DashboardAgentComponent} from '../agent/dashboard-agent/dashboard-agent.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardAdminComponent,
    DashboardClientComponent,
    NgIf,
    DashboardAgentComponent,
    //  DashboardAgentComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: UserRole | null = null;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    // Initialiser le rôle de l’utilisateur
    this.userRole = this.apiService.getCurrentUserRole();
  }
}
