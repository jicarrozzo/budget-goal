import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Category } from '../../models/categorias';
import { Expense } from '../../models/expenses';
import { Utilities } from '../../services/utils';
import { CategoryServiceProvider } from '../../providers/category-service';
import { ExpenseServiceProvider } from '../../providers/expense-service';
import { Subscription } from 'rxjs/Subscription';
import moment, { Moment } from 'moment';

@IonicPage()
@Component({
	selector: 'page-new-expense',
	templateUrl: 'new-expense.html'
})
export class NewExpensePage {
	catListSub: Subscription;
	catList: Array<Category>;
	categorySelected: Category;
	amount: number;
	removeCategories: boolean = false;
	operDate: string;
	operDateMax: string;
	operDateMin: string;

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public categoryService: CategoryServiceProvider,
		public expenseService: ExpenseServiceProvider,
		public viewCtrl: ViewController,
		public utilCtrl: Utilities
	) {}

	ionViewWillEnter() {
		this.catListSub = this.categoryService.get().subscribe((categories: Category[]) => {
			this.catList = categories;
		});
		this.operDate = moment(moment.now()).format('YYYY-MM-DD');
		this.operDateMax = moment(moment.now()).format('YYYY-MM-DD');
		// this.operDateMin = moment(moment.now()).format('YYYY-MM');
		this.categorySelected = new Category();
		this.amount = null;
	}
	ionViewWillLeave() {
		this.catListSub.unsubscribe();
	}

	//#region Categories ABM
	newCategory() {
		let prompt = this.alertCtrl.create({
			title: 'Create a new Category',
			inputs: [
				{
					label: 'Name',
					name: 'name',
					placeholder: 'Market'
				},
				{
					label: 'Code',
					name: 'code',
					placeholder: 'Mk'
				}
			],
			buttons: [
				{ text: 'Cancel', role: 'cancel' },
				{
					text: 'Confirm',
					handler: (data) => {
						let newCat = new Category();
						newCat.name = data.name;
						newCat.code = data.code;

						// new Category(data.name, data.code)
						this.categoryService.create(newCat).then(
							() => {
								this.utilCtrl.showBasisToast('New category added: ' + data.name);
							},
							(error) => {
								this.utilCtrl.showBasisToast('error: ' + error.message);
							}
						);
					}
				}
			]
		});
		prompt.present();
	}

	actionCategory(c: Category) {
		if (this.removeCategories) {
			this.categoryService.remove(c);

			this.removeCategories = false;
		} else this.categorySelected = c;
	}
	//#endregion

	dismiss() {
		this.viewCtrl.dismiss();
	}
	confirm() {
		let newExp = new Expense(moment(this.operDate, 'YYYY-MM-DD').toDate(), this.categorySelected, this.amount);

		this.expenseService.create(newExp).then(
			() => {
				this.utilCtrl.showBasisToast('Success');
				this.categoryService.updateUsage(this.categorySelected);
			},
			(error) => {
				this.utilCtrl.showBasisToast('error: ' + error.message);
			}
		);
		this.viewCtrl.dismiss({ success: true });
	}
}
