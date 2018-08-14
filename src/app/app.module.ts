import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { Utilities } from '../services/utils';
// import { FirestoreServiceProvider } from '../providers/firestore-service/firestore-service';
import { CategoryServiceProvider } from '../providers/category-service';
import { UserServiceProvider } from '../providers/user-service';
import { ExpenseServiceProvider } from '../providers/expense-service';
import { GoalServiceProvider } from '../providers/goal-service';
import { ComponentsModule } from '../components/components.module';

const firebaseconfig = {
	apiKey: 'AIzaSyCaZ4X-mXopmtt0vz7ZFW33_MZ11b-pb_o',
	authDomain: 'budgetgoal-a3f28.firebaseapp.com',
	databaseURL: 'https://budgetgoal-a3f28.firebaseio.com',
	projectId: 'budgetgoal-a3f28',
	storageBucket: 'budgetgoal-a3f28.appspot.com',
	messagingSenderId: '971669390748'
};

@NgModule({
	declarations: [ MyApp ],
	imports: [
		BrowserModule,
		HttpClientModule,
		HttpModule,
		AngularFireModule.initializeApp(firebaseconfig),
		AngularFirestoreModule.enablePersistence(),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		ComponentsModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [ IonicApp ],
	entryComponents: [ MyApp ],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		HttpClientModule,
		HttpModule,
		Utilities,
		// FirebaseServiceProvider,
		// FirestoreServiceProvider,
		CategoryServiceProvider,
		UserServiceProvider,
		ExpenseServiceProvider,
		GoalServiceProvider
	]
})
export class AppModule {}
