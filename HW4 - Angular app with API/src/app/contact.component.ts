import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from './contact';
import { ContactInfo } from './contact.info';

@Component({
  selector: 'app-contact-component',
  templateUrl: './contact.component.html',
  styleUrls: ['./app.component.css']
})

export class ContactsComponent implements OnInit {
  contacts: Contact[];
  selectedContact: Contact;
  addingContact = false;
  error: any;
  showNgFor = false;

  constructor(private router: Router, private contactInfo: ContactInfo) {}

  getContacts(): void {
    this.contactInfo
      .getContacts()
      .subscribe(
        contacts => (this.contacts = contacts),
        error => (this.error = error)
      );
  }

  addContact(): void {
    this.addingContact = true;
    this.selectedContact = null;
  }

  close(savedContact: Contact): void {
    this.addingContact = false;
    if (savedContact) {
      this.getContacts();
    }
  }

  deleteContact(contact: Contact, event: any): void {
    event.stopPropagation();
    this.contactInfo.delete(contact).subscribe(res => {
      this.contacts = this.contacts.filter(h => h !== contact);
      if (this.selectedContact === contact) {
        this.selectedContact = null;
      }
    }, error => (this.error = error));
  }

  ngOnInit(): void {
    this.getContacts();
  }

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.addingContact = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedContact.name, this.selectedContact.cat]);
  }
}
