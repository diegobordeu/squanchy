import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit {
  private MV_API_PLACES_NAME_ROUTE = 'https://www.accionet.net/api/v1/places/all/names';
  public networkDevicesData;
  public networkExtraInfo;
  public isDataReady;
  public test = [1, 2, 3, 4];
  public keys;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.start().then(() => {
      console.log(this.networkExtraInfo);
      console.log(this.networkDevicesData);
    })
  }

  private async start(){
    this.networkDevicesData = await this.getNetworks();
    this.networkExtraInfo = await this.getNetworksNames();
    mergeNetworkInfo(this.networkDevicesData, this.networkExtraInfo);
    this.keys = Object.keys(this.networkDevicesData);
    this.isDataReady = true;
    return;
  }

  public countDevices(networkDevices: Array<any>){
    let up = 0;
    let down = 0;
    const total = networkDevices.length;
    for (let i = 0; i < networkDevices.length; i++) {
      if (networkDevices[i].is_up === true){
        up++;
      }
      if (networkDevices[i].is_up === false){
        down++;
      }
    }
    return { up, down, total}
  }

  public showNetworkInfo(network){
    if(!network.info.showNetworkInfo) {
      network.info.showNetworkInfo = true;
    } else {
      if(network.info.showNetworkInfo) {
        network.info.showNetworkInfo = false;
      }
    }
  }

  private async getNetworks() {
    const data: any = await this.http.get('http://localhost:3000/api/network_device/find').toPromise();
    return parseDataNetworkDevice(data.data);
  }

  private async getNetworksNames() {
    const data: any = await this.http.get(this.MV_API_PLACES_NAME_ROUTE).toPromise();
    return data.data;
  }

}

function mergeNetworkInfo(otherInfo: any, namesInfo: Array<any>) {
  for (let i = 0; i < namesInfo.length; i++) {
    if (otherInfo[namesInfo[i].id]){
      otherInfo[namesInfo[i].id].info.name = namesInfo[i].name;
    }
  }
}

function parseDataNetworkDevice(networkDevices) {
  const response: any = {}; // { place_id: {infoDevices}}
  for (let i = 0; i < networkDevices.length; i++) {
    if (!response[networkDevices[i].place_id]){
      response[networkDevices[i].place_id] = {};
    }
    if (!response[networkDevices[i].place_id].info){
      response[networkDevices[i].place_id].info = {};
    }
    if (!response[networkDevices[i].place_id].device){
      response[networkDevices[i].place_id].device = [];
    }
    response[networkDevices[i].place_id].device.push(networkDevices[i]);
  }
  const keys = Object.keys(response);
  for (let i = 0; i < keys.length; i++) {
    response[keys[i]].info.is_router_up = checkIfRouterIsUp(response[keys[i]].device);
  }
  return response;
}

function checkIfRouterIsUp(placeDevices: Array<any>){
    for (let i = 0; i < placeDevices.length; i++) {
      if (placeDevices[i].ip === '0.0.0.0' && placeDevices[i].is_up) {
        return true;
      }
      // const device = placeDevices[keys[i]];
      // if (keys[i] === '0.0.0.0' && device.is_up) {
      //   return true;
      // }
    }
    return false;
  }
