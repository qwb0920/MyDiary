import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { ContactService } from '../../providers/contact-service';

@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html'
})
export class ContactListPage {
  public contactList: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public contactServ: ContactService) {
    this.contactList = this.contactServ.getContactList();
  }

  showContactDetail(contactId: string): void {
    this.navCtrl.push(ContactDetailPage, { contactId: contactId });
  }

  createContact(): void {
    this.modalCtrl.create(ContactEditPage).present();
  }

  updateContact(contactId: string, userName: string, phoneNo: string, avatar?: string) {
    this.navCtrl.push(ContactEditPage, {contactId: contactId, userName: userName, phoneNo: phoneNo, avatar: avatar});
  }

  deleteContact(contactId: string): void {
    this.contactServ.deleteContact(contactId);
  }
}