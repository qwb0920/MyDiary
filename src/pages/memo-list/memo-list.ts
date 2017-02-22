import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, ItemSliding } from 'ionic-angular';
import { MemoEditPage } from '../memo-edit/memo-edit';
import { MemoDetailPage } from '../memo-detail/memo-detail';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-memo-list',
  templateUrl: 'memo-list.html'
})
export class MemoListPage {

  theme: string;
  memoList: any;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController,
    private modalCtrl: ModalController, private memoServ: MemoService,
    private configServ: ConfigService) {

    this.initializeMemo();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }
  
  initializeMemo() {
    this.memoList = this.memoServ.getMemoList();
  }

  showMemoDetail(memoId: string): void {
    this.navCtrl.push(MemoDetailPage, {memoId});
  }

  createMemo(): void {
    this.navCtrl.push(MemoEditPage);
  }

  updateMemo(memoId: string, title: string, slidingItem: ItemSliding) {
    this.navCtrl.push(MemoEditPage, {memoId, title});
    slidingItem.close();
  }

  deleteMemo(memoId: string, slidingItem: ItemSliding): void {
    let confirm = this.alertCtrl.create({
      title: '刪除備忘錄',
      message: '確認刪除？',
      buttons: [{
        text: '確認',
        handler: () => {
          this.memoServ.deleteMemo(memoId);
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
    confirm.present();
    slidingItem.close();
  }

  searchMemo(ev) {
    this.initializeMemo();
    let targetVal = ev.target.value;

    if (targetVal && targetVal.trim() != '') {
      this.memoList = this.memoList.map((memos) => {
        let result = memos.filter(
          memo => memo.title.toLowerCase().indexOf(targetVal.toLowerCase()) > -1
        );
        
        return result;
      })
    }
  }
}
