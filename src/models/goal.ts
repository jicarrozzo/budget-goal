import moment, { Moment } from 'moment';
import { Expense, IExpense } from './expenses';
import { Category } from './categorias';

//#region Category of expenses
export interface IGoal {
	id: string;
	creator?: string;
	type: number;
	title: string;
	code: string;
	usage: number;
	moneylimit: number;
	percentage: number;
	dtStart: number;
	dtFinish: number;
	expensesList?: Array<Expense>;
}
export class Goal implements IGoal {
	start(): void {
		this.dtStart = moment.now();
		this.expensesList = new Array<Expense>();
		this.usage = 0;
	}
	checkValues(): boolean {
		if (this.title == null || this.title === '') return false;
		if (this.code == null || this.code === '') return false;
		if (this.moneylimit == null || this.moneylimit === 0) return false;
		if (this.month == null || this.month === '') return false;
		if (this.category == null) return false;

		return true;
	}

	public id: string;
	public creator?: string;
	public type: number;
	public title: string;
	public code: string;
	public dtStart: number;
	public dtFinish: number;
	public usage: number;
	public moneylimit: number;
	public percentage: number;
	public category: Category;
	public month: string;
	public applyDateFrom: Date;
	public applyDateTo: Date;

	public expensesList?: Array<Expense>;

	constructor() {
		this.usage = 0;
		this.percentage = 0;
	}
	// constructor(private _g?: IGoal, private _m?: string, private _c?: Category) {
	// 	this.title = null;
	// 	this.code = null;
	// 	this.moneylimit = null;
	// 	this.usage = 0;
	// 	if (_g != null) {
	// 		this.id = _g.id;
	// 		this.type = _g.type;
	// 		this.title = _g.title;
	// 		this.code = _g.code;
	// 		this.dtStart = _g.dtStart;
	// 		this.dtFinish = _g.dtFinish;
	// 		this.usage = _g.usage;
	// 		this.moneylimit = _g.moneylimit;
	// 		this.percentage = _g.percentage;
	// 		this.creator = _g.creator;
	// 		this.expensesList = _g.expensesList;
	// 	}
	//}
}
// export class GoalByMonthCategory extends Goal {
// 	public category: Category;
// 	public month: string;

// 	public checkValues(): boolean {
// 		if (this.title == null || this.title === '') return false;
// 		if (this.code == null || this.code === '') return false;
// 		if (this.moneylimit == null || this.moneylimit === 0) return false;
// 		if (this.month == null || this.month === '') return false;
// 		if (this.category == null) return false;

// 		return true;
// 	}
// 	 constructor(private _g?: IGoal, private _m?:string, private _c?:Category){
// 		 super();
// 		 if(_m !=null){
// 			 this.month =_m;
// 		 }
// 		 if(_c !=null){
// 			this.category =_c;
// 		}
// 	 }
// }

//#endregion
