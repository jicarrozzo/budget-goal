import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	AlertController,
	ActionSheetController,
	ModalController,
	MenuController
} from 'ionic-angular';
import { Expense } from '../../models/expenses';
import { ExpenseServiceProvider } from '../../providers/expense-service';
import moment, { Moment } from 'moment';
import { Category } from '../../models/categorias';
import { CategoryServiceProvider } from '../../providers/category-service';
import { aCategory } from '../../models/analytics';

@IonicPage()
@Component({
	selector: 'page-analytics',
	templateUrl: 'analytics.html'
})
export class AnalyticsPage {
	expensesList: Array<Expense>;
	expensesListFiltered: Array<Expense>;
	total: number;
	searchDate: string;

	categoriesList: Array<aCategory>;

	constructor(
		public navCtrl: NavController,
		public expenseService: ExpenseServiceProvider,
		public categoriesService: CategoryServiceProvider,
		private alertCtrl: AlertController,
		private actionSheetCtrl: ActionSheetController,
		private modalCtrl: ModalController,
		menuCtrl: MenuController
	) {
		menuCtrl.enable(true);
	}

	ionViewDidLoad() {
		let firstDay = moment(moment.now()).startOf('month');
		// firstDay.subtract(firstDay.days(), 'day');

		this.searchDate = firstDay.format('YYYY-MM-DD');
		// console.log(this.searchDate);
		this.loadExpenses();
	}
	loadExpenses() {
		// console.log(this.searchDate);
		let start = moment(this.searchDate, 'YYYY-MM-DD'); //.toDate();
		let end = start.clone().add(1, 'month').subtract(1, 'minute');

		console.log(start.toDate());
		this.expenseService.getByDates(start.toDate(), end.toDate()).subscribe((exps) => {
			// console.log(exps);
			this.expensesList = exps;
			this.processList();
		});
	}

	processList() {
		this.categoriesList = new Array<aCategory>();
		this.expensesList.forEach((e: Expense) => {
			// console.log(e);
			let lc = this.categoriesList.filter((cat: aCategory) => cat.category.id === e.category.id);
			let a: aCategory;

			if (lc.length == 0) {
				a = new aCategory();
				a.category = e.category;
				a.usage = 0;
				a.amount = 0;
				this.categoriesList.push(a);
			} else a = lc[0];

			a.usage++;
			a.amount = Number(a.amount) + Number(e.amount);
		});
	}
}
