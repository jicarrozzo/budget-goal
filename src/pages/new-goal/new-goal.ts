import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Goal } from '../../models/goal';
import { Category } from '../../models/categorias';
import { CategoryServiceProvider } from '../../providers/category-service';
import { Utilities } from '../../services/utils';
import moment, { Moment } from 'moment';
import { GoalServiceProvider } from '../../providers/goal-service';

@IonicPage()
@Component({
	selector: 'page-new-goal',
	templateUrl: 'new-goal.html'
})
export class NewGoalPage {
	catListSub: Subscription;
	catList: Array<Category>;
	newGoal: Goal;
	goalType: number;
	monthSelected: number;

	constructor(
		public navCtrl: NavController,
		public categoryService: CategoryServiceProvider,
		public goalService: GoalServiceProvider,
		public viewCtrl: ViewController,
		public utilCtrl: Utilities
	) {
		this.newGoal = null;
	}

	ionViewDidLoad() {
		this.catListSub = this.categoryService.get().subscribe((categories: Category[]) => {
			this.catList = categories;
		});
	}
	ionViewWillLeave() {
		this.catListSub.unsubscribe();
	}
	createGoal() {
		switch (Number(this.goalType)) {
			case 0:
				{
					this.newGoal = new Goal();
					this.newGoal.type = this.goalType;
				}
				break;
		}
	}

	monthUpdate() {
		this.newGoal.applyDateFrom = moment(this.newGoal.month, 'YYYY-MM').toDate();
		this.newGoal.applyDateTo = moment(this.newGoal.month, 'YYYY-MM').add(1, 'month').subtract(1, 'minute').toDate();
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
	confirm() {
		switch (Number(this.goalType)) {
			case 0:
				{
					if (!(this.newGoal as Goal).checkValues()) {
						this.utilCtrl.showBasisToast('Ups!.. there is something missing on your Goal, please check it');
						return false;
					}

					console.log(this.newGoal);
					this.goalService.create(this.newGoal).then(
						() => {
							this.utilCtrl.showBasisToast('Success');

							// this.categoryService.updateUsage(this.categorySelected);
						},
						(error) => {
							this.utilCtrl.showBasisToast('error: ' + error.message);
						}
					);
				}
				break;
		}
		this.viewCtrl.dismiss({ success: true });
	}
}
