import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Goal } from '../models/goal';

@Injectable()
export class GoalServiceProvider {
	authState: Observable<firebase.User>;
	user: firebase.User;

	private iCollection: AngularFirestoreCollection<Goal>;
	iList: Observable<Goal[]>;

	constructor(public afAuth: AngularFireAuth, public af: AngularFirestore) {
		this.authState = afAuth.authState;
		this.authState.subscribe((user) => {
			if (user) {
				this.user = user;

				this.iCollection = af.collection<Goal>('goals', (ref) => ref.where('creator', '==', this.user.email));

				this.iList = af
					.collection('goals', (ref) => ref.where('creator', '==', this.user.email).orderBy('title', 'asc'))
					.snapshotChanges()
					.map((actions) => {
						return actions.map((a) => {
							const data = a.payload.doc.data() as Goal;
							data.id = a.payload.doc.id;
							return data;
						});
					});
			}
		});
	}

	get() {
		return this.iList;
	}

	create(x: Goal) {
		x.creator = this.user.email;
		return this.iCollection.add(Object.assign({}, x));
	}
	remove(x: Goal) {
		this.iCollection.doc<Goal>(x.id).delete();
	}

	updatePercentage(x: Goal, t: number) {
		let p: number = t * 100 / x.moneylimit;
		this.iCollection.doc<Goal>(x.id).update({
			usage: t,
			percentage: p
		});
	}
}
