import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from './fcm.service';
import { ToastService } from './shared/service/toast.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Redes',
      url: '/network',
      icon: 'wifi'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'cloud-outline',
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    private toastr: ToastService,
    public toastController: ToastController,
  ) {
    this.initializeApp();
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
  this.fcm.getToken();
  this.fcm.onNotifications().subscribe(
    (msg) => {
      if (this.platform.is('ios')) {
        this.presentToast(msg.aps.alert);
      } else {
        this.presentToast(msg.body);
      }
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }
}
