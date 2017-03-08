import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { File, FileChooser, Entry, FileError } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { ConfigService } from '../../providers/config-service';

declare var cordova: any;

@Component({
  selector: 'page-user-config',
  templateUrl: 'user-config.html'
})
export class UserConfigPage {

  theme: string;
  userName: string;
  userGender: string;
  userAvatar: string;
  avatarFromFile: boolean = false;

  constructor(private navCtrl: NavController, private appCtrl: App,
    private storage: Storage, private configServ: ConfigService) {}

  ionViewWillEnter() {
    this.userName = this.configServ.getUserName();
    this.userGender = this.configServ.getUserGender();
    this.userAvatar = this.configServ.getUserAvatar();
    this.theme = this.userGender;
  }

  updateSettings() {
    this.userName = (this.userName === null || this.userName.trim().length === 0) ? '你的名字是？' : this.userName;
    this.userGender = (this.userGender === null || this.userGender.trim().length === 0) ? 'male' : this.userGender;
    this.userAvatar = (this.avatarFromFile === true) ? this.userAvatar : 'assets/img/avatar-' + this.userGender + '.png';

    this.storage.set('userName', this.userName);
    this.storage.set('userGender', this.userGender);
    this.storage.set('userAvatar', this.userAvatar);

    this.configServ.setUserName(this.userName);
    this.configServ.setUserGender(this.userGender);
    this.configServ.setUserAvatar(this.userAvatar);
    
    this.navCtrl.pop();
  }

  chooseAvatar() {
    FileChooser.open()
      .then(uri => {
        const fileName = uri.replace(/^.*[\\\/]/, '');
        const path = uri.replace(/[^\/]*$/, '');
        
        File.copyFile(path, fileName, cordova.file.dataDirectory, fileName)
          .then((data: Entry) => {
            this.avatarFromFile = true;
            this.userAvatar = cordova.file.dataDirectory + fileName;
          })
          .catch((error: FileError) => {
            this.userAvatar = '';
            console.log(error)
          });
      })
      .catch(error => {
        console.log(error)
      });
  }
}
