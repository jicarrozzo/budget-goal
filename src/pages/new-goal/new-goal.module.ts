import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewGoalPage } from './new-goal';

@NgModule({
  declarations: [
    NewGoalPage,
  ],
  imports: [
    IonicPageModule.forChild(NewGoalPage),
  ],
})
export class NewGoalPageModule {}
