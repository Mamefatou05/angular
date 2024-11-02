import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../models/contact.model';
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-contact-list',
    standalone: true,
    templateUrl: './contact-list.component.html',
    imports: [
        NgIf,
        NgForOf
    ]
})
export class ContactListComponent implements OnInit {
    contacts: Contact[] = [];
    loading = true;

    constructor(private contactService: ContactService) {}

    ngOnInit() {
        this.loadContacts();
    }

    private loadContacts() {
        this.contactService.getContacts().subscribe({
            next: (response) => {
                this.contacts = response.data;
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }
}
