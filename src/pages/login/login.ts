import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	Loading,
	LoadingController,
	AlertController,
	MenuController
} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
// import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { UserServiceProvider } from '../../providers/user-service';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	loginForm: FormGroup;
	loading: Loading;
	constructor(
		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		// public fbService: FirebaseServiceProvider,
		// public fsService: FirestoreServiceProvider,
		public userService: UserServiceProvider,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		menuCtrl: MenuController
	) {
		this.loginForm = formBuilder.group({
			email: [ '', Validators.compose([ Validators.required, EmailValidator.isValid ]) ],
			password: [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
		});

		menuCtrl.enable(false);
	}

	gotoSignUp() {
		this.navCtrl.push('RegistrationPage');
	}
	loginUser() {
		if (this.loginForm.valid) {
			this.loading = this.loadingCtrl.create();
			this.loading.present();
			this.userService.login(this.loginForm.value.email, this.loginForm.value.password).then(
				(data) => {
					console.log('entro');
					this.loading.dismiss();
				},
				(error) => {
					this.loading.dismiss().then(() => {
						let alert = this.alertCtrl.create({
							title: 'Error',
							message: error.message,
							buttons: [
								{
									text: 'Ok',
									role: 'cancel'
								}
							]
						});
						alert.present();
					});
				}
			);
		}
	}
	resetPassword() {
		let prompt = this.alertCtrl.create({
			title: 'Restablecer contraseña',
			message: 'Ingrese su dirección de correo',
			inputs: [
				{
					name: 'email',
					placeholder: 'juan@perez.com'
				}
			],
			buttons: [
				{ text: 'Cancelar', role: 'cancerl' },
				{
					text: 'Restablecer',
					handler: (data) => {
						this.userService
							.resetPassword(data.email)
							.then(() => {
								this.showBasisAlert('Exito', 'Verifique su casilla de correo para mas información');
							})
							.catch((err) => {
								this.showBasisAlert('Ups...', err.message);
							});
					}
				}
			]
		});
		prompt.present();
	}
	showBasisAlert(title, text) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: text,
			buttons: [ 'Ok' ]
		});
		alert.present();
	}
}
