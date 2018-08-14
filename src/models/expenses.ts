import moment, { Moment } from 'moment';
import { Category } from './categorias';

//#region Expenses
export interface IExpense {
	id: string;
	date: Date;
	category: Category;
	amount: number;
}

export class Expense implements IExpense {
	public id: string;
	public creator?: string;

	constructor(public date: Date, public category: Category, public amount: number) {}
}
//#endregion
