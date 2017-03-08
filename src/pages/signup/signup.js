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
import { LoadingController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
import { LocaleService } from '../../providers/locale-service';
var SignupPage = (function () {
    function SignupPage(authServ, formBuilder, alertCtrl, loadingCtrl, viewCtrl, localeServ) {
        this.authServ = authServ;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.localeServ = localeServ;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    SignupPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SignupPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    SignupPage.prototype.signupUser = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        }
        else {
            this.authServ.registerUser(this.signupForm.value.email, this.signupForm.value.password).then(function () {
                _this.loader.dismiss();
            }, function (error) {
                _this.loader.dismiss().then(function () {
                    var options = {
                        message: '',
                        buttons: [{
                                text: '',
                                role: 'cancel'
                            }]
                    };
                    _this.localeServ.localize('SIGNUP_PAGE.ALERT.MSG', function (value) { options.message = value; });
                    _this.localeServ.localize('SIGNUP_PAGE.ALERT.CONFIRM', function (value) { options.buttons[0].text = value; });
                    var alert = _this.alertCtrl.create(options);
                    alert.present();
                });
            });
            this.loader = this.loadingCtrl.create();
            this.loader.present();
        }
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Component({
        selector: 'page-signup',
        templateUrl: 'signup.html'
    }),
    __metadata("design:paramtypes", [AuthService, FormBuilder,
        AlertController, LoadingController,
        ViewController,
        LocaleService])
], SignupPage);
export { SignupPage };
//# sourceMappingURL=signup.js.map