import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
// import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './fcm.service';
import { ToastService } from './shared/service/toast.service';
// import { HttpClient } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
// Initialize Firebase
  var config = {
  apiKey: "AIzaSyAW77hjZ_iz-Wjg0aKEyCTIQtGm84sCA_Q",
  authDomain: "puchnotification-30187.firebaseapp.com",
  databaseURL: "https://puchnotification-30187.firebaseio.com",
  projectId: "puchnotification-30187",
  storageBucket: "puchnotification-30187.appspot.com",
  messagingSenderId: "253874920278"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    // IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    FcmService,
    ToastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
