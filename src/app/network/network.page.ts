import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getNetworks();
  }

  private async getNetworks(){
    console.log('aaaaas')
    const networkDevices = await this.http.get('http://localhost:3000/api/network_device/find').toPromise();
    console.log(networkDevices);
    return;
  }

}
