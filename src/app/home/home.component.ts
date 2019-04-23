import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Contact } from './form/contact.model';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('contactList', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  contacts: Contact[];
  editMode: boolean;
  subscription: Subscription;
  contactToEdit: Contact = {
    _id: null,
    name: '',
    phone: '',
    email: ''
  };

  constructor(
    private dataService: DataService) { }

  ngOnInit() {
    this.getContacts();
}

  getContacts(): void {
    this.dataService.getContacts()
      .subscribe(contacts => this.contacts = contacts);
  }

  onDelete(contact: Contact): void {
    this.contacts = this.contacts.filter(c => c !== contact);
    this.dataService.deleteContact(contact._id).subscribe();
  }

  onAddContact(newContact: Contact) {
    this.dataService.addContact(newContact)
      .subscribe(contact => this.contacts.push(contact));
  }

  onUpdateContact(contact: Contact) {
    this.contactToEdit = {
      '_id': null,
      'name': '',
      'phone': '',
      'email': ''
    };
    this.dataService.updateContact(contact)
      .subscribe(contact => {
        const index = contact ? this.contacts.findIndex(c => c._id === contact._id) : -1;
        if (index > -1) (this.contacts[index] = contact);
        this.contacts.forEach(
          (value, index) => {
            if(contact._id === value._id) {
              this.contacts.splice(index, 1);
              this.contacts.unshift(contact);
            }
        })
      });
  }

  onEditItem(contact: Contact) {
    this.contactToEdit = contact;
    this.editMode = true;
  }
}
