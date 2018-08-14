import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

// import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
// import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { UserServiceProvider } from '../../providers/user-service';

@IonicPage()
@Component({
	selector: 'page-registration',
	templateUrl: 'registration.html'
})
export class RegistrationPage {
	singupForm: FormGroup;
	loading: Loading;
	constructor(
		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		// public fbService: FirebaseServiceProvider,
		// public fsService: FirestoreServiceProvider,
		public userService: UserServiceProvider,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController
	) {
		this.singupForm = formBuilder.group({
			email: [ '', Validators.compose([ Validators.required, EmailValidator.isValid ]) ],
			password: [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ],
			name: [ '', Validators.compose([ Validators.required, Validators.minLength(3) ]) ]
		});
	}

	signupUser() {
		if (this.singupForm.valid) {
			this.loading = this.loadingCtrl.create();
			this.loading.present();
			this.userService //fbService
				.singUp(this.singupForm.value.email, this.singupForm.value.password, this.singupForm.value.name)
				.then(
					() => {
						this.loading.dismiss().then(() => {
							this.navCtrl.setRoot('LoginPage');
						});
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
}
