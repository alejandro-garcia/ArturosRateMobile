import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { RateService } from './services/rate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
    private fcm: FCM,
    private tokenService: RateService
   
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //cloud messaging
      this.fcm.getToken().then(token => {
        console.log("BEGIN fcm token");
        console.log(token);
        this.tokenService.RegisterToken(token);
        console.log("END fcm token");
      });      
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("BEGIN REFRESH fcm token");
        console.log(token);
        this.tokenService.RegisterToken(token);
        console.log("END REFRESH fcm token");
      });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
          console.log('BEGIN received data object');
          console.log(data);
          console.log('END received data object');
          this.router.navigate([data.landing_page, data.EffectiveDate, data.Rate, data.hasFiles]);
          
        } else {
          console.log('Received in foreground');
          console.log('BEGIN received data object');
          console.log(data);
          console.log('END received data object');
          this.router.navigate([data.landing_page, data.EffectiveDate, data.Rate, data.hasFiles]);
        }
      });

      this.authService.authenticationState.subscribe(state=>{
         console.log("ejecutando... authenticationState.subscribe en app-component.ts");
         if (state){
           this.router.navigate(['member','add']);
         } else {
           this.router.navigate(['status']);
         }
      });
    });
  }
  logout(){
    console.log("app.component/logout");
    this.authService.logout();
  }
}
