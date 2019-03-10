import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public registerCredentials = {
    username: '',
    password: ''
  };
  private BACKEND_URL = 'http://localhost:3000'
  // private BACKEND_URL = 'https://mrmeeseek.herokuapp.com';

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  // public login() {
  //   this.showLoading()
  //   this.auth.login(this.registerCredentials).subscribe(allowed => {
  //     if (allowed) {
  //       this.nav.setRoot('HomePage');
  //     } else {
  //       this.showError("Access Denied");
  //     }
  //   },
  //     error => {
  //       this.showError(error);
  //     });
  // }
  //
  // showLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Please wait...',
  //     dismissOnPageChange: true
  //   });
  //   this.loading.present();
  // }
  //
  // showError(text) {
  //   this.loading.dismiss();
  //
  //   let alert = this.alertCtrl.create({
  //     title: 'Fail',
  //     subTitle: text,
  //     buttons: ['OK']
  //   });
  //   alert.present(prompt);
  // }

  public async doLogin(){
    // const login = this.http.get(`${this.BACKEND_URL}/login`).toPromise();
    // console.log(login);
    let params = new HttpParams();
    params = params.append('username', this.registerCredentials.username);
    params = params.append('password', this.registerCredentials.password);

    const response = await this.http.post(`${this.BACKEND_URL}/login`, {} ,{params}).toPromise();
    console.log(response);
    return;
  }

}
