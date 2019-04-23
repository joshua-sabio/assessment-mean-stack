import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Contact } from './home/form/contact.model';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class DataService {
contactsUrl = 'https://obscure-taiga-98500.herokuapp.com/api/contacts/';
contacts: Contact[];

startEdit = new Subject<Contact>();

    constructor(private httpClient: HttpClient) { }

    getContacts(): Observable<Contact[]> {
        return this.httpClient.get<Contact[]>(this.contactsUrl).pipe(
            catchError(this.errorHandler)
        );
    }

    addContact (contact: Contact): Observable<Contact> {
        return this.httpClient.post<Contact>(this.contactsUrl, contact).pipe(
            catchError(this.errorHandler)
        );
    }

    deleteContact (id: string): Observable<{}> {
        const url = `${this.contactsUrl}${id}`;
        return this.httpClient.delete(url).pipe(
            catchError(this.errorHandler)
        );
    }

    getContact(id: string) {
        const url = `${this.contactsUrl}${id}`;
        return this.httpClient.get<Contact>(url).pipe(
            catchError(this.errorHandler)
        );
    }

    updateContact (contact: Contact): Observable<Contact> {
        console.log(contact);
        const updatedContact = {
          name: contact.name,
          phone: contact.phone,
          email: contact.email
        };
        const url = `${this.contactsUrl}${contact._id}`;
        return this.httpClient.put<Contact>(url, updatedContact).pipe(
            catchError(this.errorHandler)
        );
    }

    private errorHandler(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        }
        else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
                );
        }
        return throwError(
            'An error occurred.'
        );
    }
}

   