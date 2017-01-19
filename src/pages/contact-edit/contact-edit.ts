import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { IContact, ContactService } from '../../providers/contact-service';

@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html'
})
export class ContactEditPage {
  
  contactForm: any;
  contactId: string = '';
  inputContact: IContact;
  inputName: string = '';
  inputPhone: string = '';
  inputAvatar: string = '';
  mode: string = '';
  modeDesc: string = '';
  nameChanged: boolean = false;
  submitAttempt: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public contactServ: ContactService,
    public formBuilder: FormBuilder) {

    this.contactId = this.navParams.get('contactId') || '';
    this.inputContact = this.navParams.get('contact') || {};
    this.inputName = this.inputContact.name || '';
    this.inputPhone = this.inputContact.phone || '';
    this.inputAvatar = this.inputContact.avatar || '';

    this.contactForm = formBuilder.group({
       name: ['', Validators.required],
       phone: ['', Validators.required]
    });

    if (this.contactId) {
      this.mode = 'update';
      this.modeDesc = '編輯聯絡人';
      this.contactForm.controls['name'].patchValue(this.inputName);
      this.contactForm.controls['phone'].patchValue(this.inputPhone);
    } else {
      this.mode = 'create';
      this.modeDesc = '新增聯絡人';
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  elementChanged(input) {
     let field = input.inputControl.name;
     this[field + "Changed"] = true;
  }

  editContact() {
    this.submitAttempt = true;

    if (!this.contactForm.valid) {
      console.log(this.contactForm.value);
    } else {
      let contact: IContact = {
        name: this.contactForm.value.name,
        phone: this.contactForm.value.phone,
        avatar: this.contactForm.value.avatar || 'assets/img/avatar-female.png'
      }
      
      if (this.mode === 'create') {
        this.contactServ.createContact(contact)
        .then(
          () => {this.dismiss();}, 
          error => {console.log(error);}
        );
      } else if (this.mode === 'update') {
        this.contactServ.updateContact(this.contactId, contact)
        .then(
          () => {this.dismiss();}, 
          error => {console.log(error);}
        );
      }
    } 
  }
}
