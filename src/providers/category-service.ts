import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Category, ICategory } from '../models/categorias';

@Injectable()
export class CategoryServiceProvider {
	authState: Observable<firebase.User>;
	user: firebase.User;

	private categoriesCollection: AngularFirestoreCollection<Category>;
	private categoriesList: Observable<Category[]>;

	constructor(public afAuth: AngularFireAuth, public af: AngularFirestore) {
		this.authState = afAuth.authState;
		this.authState.subscribe((user: firebase.User) => {
			if (user) {
				this.user = user;
				// console.log(this.user);

				this.categoriesCollection = af.collection<Category>('categories', (ref) =>
					ref.where('creator', '==', this.user.email)
				);

				this.categoriesList = af
					.collection('categories', (ref) => ref.where('creator', '==', this.user.email).orderBy('usage', 'desc'))
					.snapshotChanges()
					.map((actions) => {
						return actions.map((a) => {
							const data = a.payload.doc.data() as Category;
							data.id = a.payload.doc.id;
							return data;
						});
					});
			}
		});
	}

	get() {
		// console.log(this.categoriesList);
		return this.categoriesList;
	}

	create(ca: Category): Promise<any> {
		ca.creator = this.user.email;
		return this.categoriesCollection.add(JSON.parse(JSON.stringify(ca)));
	}
	remove(ca: Category): Promise<void> {
		return this.categoriesCollection.doc<Category>(ca.id).delete();
	}
	updateUsage(ca: Category): Promise<void> {
		let usage = ca.usage;
		usage++;
		return this.categoriesCollection.doc<Category>(ca.id).update({ usage: usage });
	}
	//#endregion
}
