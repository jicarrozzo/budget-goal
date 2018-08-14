import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	AlertController,
	ToastController,
	ModalController,
	ActionSheetController,
	MenuController
} from 'ionic-angular';

import { Expense } from '../../models/expenses';
import { Category } from '../../models/categorias';
import { ExpenseServiceProvider } from '../../providers/expense-service';

@IonicPage()
@Component({
	selector: 'page-expenses',
	templateUrl: 'expenses.html'
})
export class ExpensesPage {
	expensesList: Array<Expense>;
	expensesListFiltered: Array<Expense>;
	total: number;

	constructor(
		public navCtrl: NavController,
		public expenseService: ExpenseServiceProvider,
		private alertCtrl: AlertController,
		private actionSheetCtrl: ActionSheetController,
		private modalCtrl: ModalController,
		menuCtrl: MenuController
	) {
		menuCtrl.enable(true);
	}

	ionViewDidLoad() {
		this.loadExpenses();
	}
	loadExpenses() {
		this.expenseService.get().subscribe((exps) => {
			this.expensesList = exps;
			this.processList();
		});
	}
	processList() {
		this.expensesListFiltered = JSON.parse(JSON.stringify(this.expensesList));
		// console.log(this.expensesListFiltered);
		this.total = 0;

		this.expensesListFiltered.forEach((exp: Expense) => {
			this.total += Number(exp.amount);
		});
	}

	newExpense() {
		let modal = this.modalCtrl.create('NewExpensePage', {});
		modal.onDidDismiss((data) => {
			if (data == null || data.success == null) return;
		});
		modal.present();
	}

	removeExpense(exp: Expense) {
		this.expenseService.remove(exp);
	}

	showOptions(exp: Expense) {
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Options',
			buttons: [
				{
					text: 'Delete',
					role: 'delete',
					handler: () => {
						this.removeExpense(exp);
					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}
}
