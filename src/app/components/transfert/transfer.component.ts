import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { UserService } from '../../services/user.service';
import { TransferFormData } from '../../models/transaction.model';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './transfer.component.html'
})
export class TransferComponent implements OnInit {
  @Input() receiverPhoneNumber: string = '';
  @Input() editablePhone: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSuccess = new EventEmitter<TransferFormData>();

  transferForm: FormGroup;
  senderPhoneNumber: string | null = null;
  totalAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private userService: UserService
  ) {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      fees: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      receiverPhoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]
    });

    // Observer les changements sur amount et fees
    this.transferForm.get('amount')?.valueChanges.subscribe(() => this.updateTotalAmount());
    this.transferForm.get('fees')?.valueChanges.subscribe(() => this.updateTotalAmount());
  }

  ngOnInit() {
    if (this.receiverPhoneNumber) {
      this.transferForm.patchValue({ receiverPhoneNumber: this.receiverPhoneNumber });
    }

    this.userService.getCurrentUser().subscribe({
      next: (response) => {
        this.senderPhoneNumber = response.data.phoneNumber;
      },
      error: (error) => console.error('Erreur lors de la récupération de l\'utilisateur connecté:', error)
    });
  }

  updateTotalAmount() {
    const amount = parseFloat(this.transferForm.get('amount')?.value) || 0;
    const fees = parseFloat(this.transferForm.get('fees')?.value) || 0;
    this.totalAmount = amount + fees;
  }

  onSubmitTransfer() {
    if (this.transferForm.valid && this.senderPhoneNumber) {
      const formData: TransferFormData = {
        ...this.transferForm.value,
        senderPhoneNumber: this.senderPhoneNumber
      };

      console.log(formData);
      this.transactionService.createTransfer(formData).subscribe({
        next: () => {
          this.onSuccess.emit(formData);
          this.onClose.emit();
        },
        error: (error) => console.error('Erreur de transfert:', error)
      });
    }
  }
}
