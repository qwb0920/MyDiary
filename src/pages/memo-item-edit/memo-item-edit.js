var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
var MemoItemEditPage = (function () {
    function MemoItemEditPage(navParams, viewCtrl, alertCtrl, memoServ, configServ, localeServ) {
        var _this = this;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.memoServ = memoServ;
        this.configServ = configServ;
        this.localeServ = localeServ;
        this.memoId = '';
        this.entryValid = true;
        this.entryChanged = false;
        this.createMode = false;
        this.submitAttempt = false;
        this.itemBuffer = new Object();
        this.memoServ.getMemo(this.navParams.get('memoId')).subscribe(function (memoSnap) {
            _this.memo = memoSnap;
        });
        this.itemList = this.memoServ.getItemList(this.navParams.get('memoId'));
        this.memoId = this.navParams.get('memoId');
    }
    MemoItemEditPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    MemoItemEditPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    MemoItemEditPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    MemoItemEditPage.prototype.bufferItem = function (itemId, item, entry) {
        if (entry !== null && entry.value.trim().length !== 0) {
            this.itemBuffer[itemId] = { entry: entry.value, checked: item.checked };
        }
    };
    MemoItemEditPage.prototype.updateAllItems = function () {
        for (var key in this.itemBuffer) {
            this.memoServ.updateItem(this.memoId, key, this.itemBuffer[key]['entry'], this.itemBuffer[key]['checked']);
        }
        this.dismiss();
    };
    MemoItemEditPage.prototype.deleteItem = function (itemId) {
        var _this = this;
        var options = {
            title: '',
            message: '',
            buttons: [{
                    text: '',
                    handler: function () {
                        _this.memoServ.deleteItem(_this.memoId, itemId);
                    }
                }, {
                    text: '',
                    role: 'cancel'
                }]
        };
        this.localeServ.localize('MEMO_ITEM_EDIT.DELETE.TITLE', function (value) { options.title = value; });
        this.localeServ.localize('MEMO_ITEM_EDIT.DELETE.MESSAGE', function (value) { options.message = value; });
        this.localeServ.localize('MEMO_ITEM_EDIT.DELETE.CONFIRM', function (value) { options.buttons[0].text = value; });
        this.localeServ.localize('MEMO_ITEM_EDIT.DELETE.CANCEL', function (value) { options.buttons[1].text = value; });
        var confirm = this.alertCtrl.create(options);
        confirm.present();
    };
    return MemoItemEditPage;
}());
MemoItemEditPage = __decorate([
    Component({
        selector: 'page-memo-item-edit',
        templateUrl: 'memo-item-edit.html'
    }),
    __metadata("design:paramtypes", [NavParams, ViewController,
        AlertController, MemoService,
        ConfigService,
        LocaleService])
], MemoItemEditPage);
export { MemoItemEditPage };
//# sourceMappingURL=memo-item-edit.js.map