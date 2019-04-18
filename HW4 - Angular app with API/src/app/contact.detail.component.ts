import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Contact } from './contact';
import { ContactInfo } from './contact.info';

@Component({
  selector: 'app-contact-detail-component',
  templateUrl: './contact.detail.component.html',
  styleUrls: ['./app.component.css']
})

export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  constructor(
    private contactInfo: ContactInfo,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params.name !== undefined) {
        const name = params.name;
        this.navigated = true;
        this.contactInfo.getContact(name).subscribe(contact => (this.contact = contact));
      } else {
        this.navigated = false;
        this.contact = new Contact();
      }
    });
  }

  save(): void {
    this.contactInfo.save(this.contact).subscribe(contact => {
      this.contact = contact; //
      this.goBack(contact);
    }, error => (this.error = error)); // TODO: Display error message
  }

  goBack(savedContact: Contact = null): void {
    this.close.emit(savedContact);
    if (this.navigated) {
      window.history.back();
    }
  }
}
