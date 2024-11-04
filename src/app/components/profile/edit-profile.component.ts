import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  updating = false;
  loading = true;
  validationErrors: { [key: string]: string[] } = {};
  user!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      // Chargement des données utilisateur
      const response = await firstValueFrom(this.userService.getCurrentUser());
      this.user = response.data;
      this.initializeForm();
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    } finally {
      this.loading = false;
    }
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user.phoneNumber],
      address: [this.user.address],
      city: [this.user.city],
      country: [this.user.country],
      dateOfBirth: [this.user.dateOfBirth],
      currentPassword: ['', Validators.required],
      password: [''],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    this.updating = true;
    const formData = new FormData();

    // Add form fields to FormData
    for (const key of Object.keys(this.profileForm.value)) {
      if (key === 'password' && !this.profileForm.value[key]) {
        continue; // ne pas ajouter si vide
      }
      formData.append(key, this.profileForm.value[key]);
    }

    // Add file if present
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append('photo', fileInput.files[0]);
    }

    try {
      const response = await firstValueFrom(this.userService.updateProfile(this.user.id, formData));
      this.user = response.data;
      await this.router.navigate(['/dashboard']); // ou toute autre route de retour
    } catch (error) {
      if (error instanceof Error) {
        this.validationErrors = (error as any).validationErrors || {};
      } else {
        console.error('Erreur lors de la mise à jour du profil:', error);
      }
    } finally {
      this.updating = false;
    }
  }

  cancel() {
    this.router.navigate(['/dashboard']); // ou toute autre route de retour
  }
}
