import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FCM } from '@ionic-native/fcm/ngx';

import { environment } from  '../environments/environment';
import { RateService } from './services/rate.service';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
      IonicModule.forRoot(), 
      AppRoutingModule,AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      FormsModule,
      IonicStorageModule.forRoot()
   ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    RateService,
    FCM
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
