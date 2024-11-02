import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';

export interface TransferFormData {
    amount: number;
    description?: string;
    receiverPhone: string;
}

@Component({
    selector: 'app-transfer',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './transfer.component.html'
})
export class TransferComponent {
    @Input() receiverPhone: string = '';
    @Input() editablePhone: boolean = false;
    @Output() onClose = new EventEmitter<void>();
    @Output() onSuccess = new EventEmitter<TransferFormData>();

    transferForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private transactionService: TransactionService
    ) {
        this.transferForm = this.fb.group({
            amount: ['', [Validators.required, Validators.min(0)]],
            description: [''],
            receiverPhone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]
        });
    }

    ngOnInit() {
        if (this.receiverPhone) {
            this.transferForm.patchValue({ receiverPhone: this.receiverPhone });
        }
    }

    onSubmitTransfer() {
        if (this.transferForm.valid) {
            const formData = this.transferForm.value;
            this.transactionService.createTransfer(formData).subscribe({
                next: (response) => {
                    this.onSuccess.emit(formData);
                    this.onClose.emit();
                },
                error: (error) => console.error('Erreur de transfert:', error)
            });
        }
    }
}
