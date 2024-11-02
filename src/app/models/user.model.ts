import {Contact} from './contact.model';
import {Transaction} from './transaction.model';
import {Wallet} from './wallet.model';

export interface User {
  role: Role;
  id: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address?: string;
  photo?: string;
  city?: string;
  country?: string;
  isVerified: boolean;
  isActive: boolean;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  profilePicture?: string; // optionnel, utilisera profileImage par défaut si non défini
  wallets?: Wallet[]; // ou définir un type plus précis si nécessaire
  transactions?: Transaction[];
  contact?: Contact[];

}

export interface Role{
  id: string;
  name: UserRole;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  AGENT = 'AGENT',
  ADMIN = 'ADMIN'
}


export interface Client extends User {
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
  // Ajoutez d'autres propriétés spécifiques au client
}

export interface Agent extends User {
  agencyName?: string;
  // Ajoutez d'autres propriétés spécifiques à l'agent
}

// models/user-requests.model.ts
export interface CreateAgentRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  password: string;
  agencyName?: string;
}

export interface CreateClientRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  password: string;
  idCardFrontPhoto: File;
  idCardBackPhoto: File;
}


export interface UpdateUser {
  id: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  photo?:string;
  currentPassword?: string; // Mot de passe actuel pour la validation
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  country?: string;
  role?: UserRole;
  kycStatus?: KycStatus;
  isVerified?: boolean;
  isActive?: boolean;
}
export enum KycStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}