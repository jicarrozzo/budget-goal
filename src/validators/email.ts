import { FormControl } from '@angular/forms';

export class EmailValidator {
	static isValid(control: FormControl) {
		let exp = /^([\w+-]+\.)*[\w+-]+@([\w+-]+\.)*[\w+-]+\.[a-zA-Z]{2,4}$/;
		// let exp =/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

		const re = exp.test(control.value);

		if (re) {
			return null;
		}
		return { invalidEmail: true };
	}
}
