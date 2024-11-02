import {Transaction} from './transaction.model';

export interface Wallet {
  id: string;
  userId: string;
  currency: string;
  balance: string;
  plafond: string;
  qrCode: string;
  isActive: boolean;
  dailyLimit: string | null;
  monthlyLimit: string | null;
  createdAt: string;
  updatedAt: string;
  receivedTransactions: Transaction[];
  sentTransactions: Transaction[];
}
