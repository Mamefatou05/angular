export interface Transaction {
  id: string;
  senderWalletId: string;
  receiverWalletId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFERE' | 'INVOICE';
  reference: string;
  description?: string;
  feeAmount: number;
  feeCurrency?: string;
  createdAt: Date;
  updatedAt: Date;
  // Ajouter ces propriétés
  senderWallet?: {
    id: string;
    currency: string;
    balance: string;
    user: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
    };
  };
  receiverWallet?: {
    id: string;
    currency: string;
    balance: string;
    user: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
    };
  };
}
export interface TransferFormData {
  amount: number;
  fees?: number;
  description?: string;
  receiverPhoneNumber?: string;
  senderPhoneNumber?:string
}
