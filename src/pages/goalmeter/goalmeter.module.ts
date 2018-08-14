import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalmeterPage } from './goalmeter';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [ GoalmeterPage ],
	imports: [ ComponentsModule, IonicPageModule.forChild(GoalmeterPage) ]
})
export class GoalmeterPageModule {}
