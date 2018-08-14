import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Expense } from '../models/expenses';
import { Category } from '../models/categorias';
import moment from 'moment';

@Injectable()
export class ExpenseServiceProvider {
	authState: Observable<firebase.User>;
	user: firebase.User;

	private expensesCollection: AngularFirestoreCollection<Expense>;
	expensesList: Observable<Expense[]>;

	constructor(public afAuth: AngularFireAuth, public af: AngularFirestore) {
		this.authState = afAuth.authState;
		this.authState.subscribe((user) => {
			if (user) {
				this.user = user;

				this.expensesCollection = af.collection<Expense>('expenses', (ref) =>
					ref.where('creator', '==', this.user.email)
				);

				this.expensesList = af
					.collection('expenses', (ref) => ref.where('creator', '==', this.user.email).orderBy('date', 'desc'))
					.snapshotChanges()
					.map((actions) => {
						return actions.map((a) => {
							const data = a.payload.doc.data() as Expense;
							data.id = a.payload.doc.id;
							return data;
						});
					});
			}
		});
	}

	get() {
		return this.expensesList;
	}

	create(x: Expense) {
		x.creator = this.user.email;
		return this.expensesCollection.add(Object.assign({}, x)); //JSON.parse(JSON.stringify(x)));
	}
	remove(ca: Expense) {
		this.expensesCollection.doc<Expense>(ca.id).delete();
	}

	getByCategory(c: Category, start: Date, end: Date): Observable<Expense[]> {
		let list: Observable<Expense[]> = this.af
			.collection('expenses', (ref) =>
				ref
					.where('creator', '==', this.user.email)
					.where('category.id', '==', c.id)
					.where('date', '>=', start)
					.where('date', '<=', end)
			)
			.snapshotChanges()
			.map((actions) => {
				return actions.map((a) => {
					const data = a.payload.doc.data() as Expense;
					return data;
				});
			});

		return list;
	}

	getByDates(start: Date, end: Date): Observable<Expense[]> {
		let list: Observable<Expense[]> = this.af
			.collection('expenses', (ref) =>
				ref.where('creator', '==', this.user.email).where('date', '>=', start).where('date', '<=', end)
			)
			.snapshotChanges()
			.map((actions) => {
				return actions.map((a) => {
					const data = a.payload.doc.data() as Expense;
					return data;
				});
			});
		return list;
	}
}
