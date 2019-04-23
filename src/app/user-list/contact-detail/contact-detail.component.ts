import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../../home/form/contact.model';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contactInfo: Contact = {
    '_id': null,
    'name': null,
    'email': null,
    'phone': null
  };
  id: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router, 
      private dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.dataService.getContact(this.id)
          .subscribe(contact => {
            this.contactInfo = contact
          }
          );
      })
  }

  backButton() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
