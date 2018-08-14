import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Utilities {
	constructor(private toastCtrl: ToastController) {}

	showBasisToast(text: string, time?: number) {
		time = time || 2000;
		let toast = this.toastCtrl.create({
			message: text,
			duration: time
		});
		toast.present();
	}
}
