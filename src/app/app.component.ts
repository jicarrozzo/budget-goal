import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utilities } from '../services/utils';
import { UserServiceProvider } from '../providers/user-service';

@Component({
	templateUrl: 'app.html',
	providers: [ Utilities ]
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any;
	userName: string;
	userEmail: string;

	constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		private userService: UserServiceProvider
	) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();

			userService.authState.subscribe((user) => {
				// console.log(user);
				if (user) {
					this.userName = user.displayName;
					this.userEmail = user.email;
					this.rootPage = 'TabsPage';
				} else this.rootPage = 'LoginPage';
			});
		});
	}

	gotoPage(page: string): void {
		this.nav.setRoot(page);
	}

	shareMe(): void {}
	logOut() {
		this.userService.logout();
	}
}
