import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class UserServiceProvider {
	authState: Observable<firebase.User>;
	user: firebase.User;

	constructor(public afAuth: AngularFireAuth, public af: AngularFirestore) {
		// this.db = firebase.firestore();

		this.authState = afAuth.authState;
		this.authState.subscribe((user) => {
			this.user = user;
		});
	}

	singUp(email: string, password: string, name: string) {
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser: firebase.User) => {
			this.af.collection('userProfile').doc(email).set({ userId: newUser.uid, name: name, email: email });
		});
	}

	login(email: string, password: string) {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}
	logout() {
		return this.afAuth.auth.signOut();
	}
	resetPassword(email) {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}
}
