import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { DecimalPipe } from '@angular/common';

@NgModule({
	declarations: [ ProgressBarComponent ],
	imports: [ IonicModule ],
	exports: [ ProgressBarComponent ]
})
export class ComponentsModule {}
