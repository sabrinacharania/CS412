import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Contact } from './contact';

@Injectable()
export class ContactInfo {
  private contactsUrl = 'app/contacts'; // URL to web api

  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http
      .get<Contact[]>(this.contactsUrl)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getContact(name: string): Observable<Contact> {
    return this.getContacts().pipe(
      map(contacts => contacts.find(contact => contact.name === name))
    );
  }

  save(contact: Contact) {
    if (contact.name) {
      return this.put(contact);
    }
    return this.post(contact);
  }

  delete(contact: Contact) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.contactsUrl}/${contact.name}`;

    return this.http.delete<Contact>(url).pipe(catchError(this.handleError));
  }

  // Add new Hero
  private post(contact: Contact) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Contact>(this.contactsUrl, contact)
      .pipe(catchError(this.handleError));
  }

  private put(contact: Contact) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.contactsUrl}/${contact.name}`;

    return this.http.put<Contact>(url, contact).pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
