import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../home/form/contact.model';
import { DataService } from '../data.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Output() deleteItem = new EventEmitter<Contact>();
  @Output() startEdit = new EventEmitter<Contact>();

  @Input() index: number;
  @Input() contact: Contact;


  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

  onEdit() {
    // this.startEdit.emit(this.contact);
    this.dataService.startEdit.next(this.contact);
  }

  onDelete() {
    this.deleteItem.emit(this.contact);
  }
}
