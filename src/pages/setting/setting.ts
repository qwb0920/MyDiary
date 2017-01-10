import { Component } from '@angular/core';
import { NavController, ViewController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../../pages/tabs/tabs';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  yourName: string;
  yourGender: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    public appCtrl: App, public storage: Storage) {

    // Get user name
    storage.get('yourName').then((val) => {
      this.yourName = val;
    }, (error) => {
      console.log(error);
    })

    // Get user gender
    storage.get('yourGender').then((val) => {
      this.yourGender = val;
    }, (error) => {
      console.log(error);
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateSetting() {
    console.log(this.yourName);
    console.log(this.yourName.trim);
    console.log(this.yourName.trim().length);
    if (this.yourName == null || this.yourName.trim().length === 0) {
      this.yourName = '你的名字是？';
    }

    this.storage.set('yourName', this.yourName);
    this.storage.set('yourGender', this.yourGender);
    this.dismiss();
    this.appCtrl.getRootNav().setRoot(TabsPage);
  }  
}
