import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ActionSheetController,
	AlertController,
	ModalController,
	MenuController
} from 'ionic-angular';
import { GoalServiceProvider } from '../../providers/goal-service';
import { Goal } from '../../models/goal';
import { ExpenseServiceProvider } from '../../providers/expense-service';
import { Expense } from '../../models/expenses';
// import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
	selector: 'page-goalmeter',
	templateUrl: 'goalmeter.html'
})
export class GoalmeterPage {
	goalsList: Array<Goal>;
	goalsListFiltered: Array<Goal>;
	loadProgress: number;

	constructor(
		public navCtrl: NavController,
		public goalService: GoalServiceProvider,
		public expensesService: ExpenseServiceProvider,
		private alertCtrl: AlertController,
		private actionSheetCtrl: ActionSheetController,
		private modalCtrl: ModalController,
		menuCtrl: MenuController
	) {
		menuCtrl.enable(true);
	}

	ionViewDidLoad() {
		this.loadGoals();
	}
	loadGoals() {
		this.goalsList = Array<Goal>();
		this.goalService.get().subscribe((goals) => {
			goals.forEach((g: Goal) => {
				this.updateGoal(g);
			});

			// console.log(goals);
			this.goalsList = goals;
			this.processList();
		});
	}

	processList() {
		this.goalsListFiltered = JSON.parse(JSON.stringify(this.goalsList));

		// this.goalsListFiltered.forEach((g: Goal) => {
		// 	(g as GoalByMonthCategory).hello();
		// 	//g.updatePercentage();
		// });
	}

	showOptions(g: Goal) {
		console.log(g);
		// let gg: Goal = g;
		// console.log(gg);

		// gg.checkValues();

		let actionSheet = this.actionSheetCtrl.create({
			title: 'Options',
			buttons: [
				{
					text: 'Update',
					role: 'update',
					handler: () => {
						this.updateGoal(g);
					}
				},
				{
					text: 'Delete',
					role: 'delete',
					handler: () => {
						this.removeGoal(g);
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

	updateGoal(g: Goal) {
		this.expensesService.getByCategory(g.category, g.applyDateFrom, g.applyDateTo).subscribe(
			(expeses: Expense[]) => {
				let total: number = 0;
				expeses.forEach((e: Expense) => {
					total += Number(e.amount);
				});

				this.goalService.updatePercentage(g, total);
			},
			(err) => {
				console.log(err);
			}
		);
	}

	newGoal() {
		let modal = this.modalCtrl.create('NewGoalPage', {});
		modal.onDidDismiss((data) => {
			if (data == null || data.persona == null) return;
		});
		modal.present();
	}
	removeGoal(g: Goal) {
		// console.log(g);
		this.goalService.remove(g);
	}
}
