import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from './contact.model';
import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  contactForm: FormGroup;
  editMode: boolean;
  subscription: Subscription;
  @Output() addContact = new EventEmitter<Contact>();
  @Output() updateContact = new EventEmitter<Contact>();
  @Input() contactToEdit: Contact = {
    '_id': null,
    'name': '',
    'email': '',
    'phone': ''
  };

  constructor(private dataService: DataService) { }

  oldContact: Contact;

  ngOnInit() {
    this.initForm();
    
    this.subscription = this.dataService.startEdit
      .subscribe(
        (editContact: Contact) => {
          this.editMode = true;
          this.oldContact = editContact;
          this.contactForm.patchValue({
            'name': this.oldContact.name,
            'email': this.oldContact.email,
            'phone': this.oldContact.phone
          })
      })
  }

  private initForm() {
    let contactName = '';
    let contactEmail = '';
    let contactPhone = '';

    this.contactForm = new FormGroup({
      'name': new FormControl(contactName, [Validators.required, Validators.minLength(5)]),
      'email': new FormControl(contactEmail, [Validators.required, Validators.email, Validators.minLength(5)]),
      'phone': new FormControl(contactPhone, [Validators.required, Validators.minLength(5)])
    });
  }

  onSubmit() {
    if (!this.editMode) {
      this.addContact.emit(this.contactForm.value);
      console.log(this.contactForm.value);
      this.onCancel();
      
    }
    else {
      let editedItem = new Contact(
        this.oldContact._id,
        this.contactForm.value['name'],
        this.contactForm.value['email'],
        this.contactForm.value['phone']
      );
      this.updateContact.emit(editedItem);
      this.onCancel();
    }
  }

  onCancel() {
    this.editMode = false;
    this.contactForm.reset();
  }
}
