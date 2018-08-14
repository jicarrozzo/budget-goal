import moment, { Moment } from 'moment';

//#region Category of expenses
export interface ICategory {
	id: string;
	name: string;
	code: string;
	usage: number;
}
export class Category implements ICategory {
	toJson() {
		return JSON.stringify(this);
	}
	public id: string;
	public name: string;
	public code: string;
	public usage: number;
	public creator?: string;

	constructor() {
		this.usage = 0;
	}
}
//#endregion
