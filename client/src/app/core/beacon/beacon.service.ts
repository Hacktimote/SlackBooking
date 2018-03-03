import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';


/*
  Generated class for the BeaconProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BeaconService {

  public delegate: any;
  public regions: any[] = [];
  public region: any;

  constructor(
    public platform: Platform,
    public events: Events,
    public ibeacon: IBeacon) {}

  initialise(): any {
    const promise: any = new Promise((resolve, reject) => {
      // we need to be running on a device
      if (this.platform.is('cordova')) {

        // Request permission to use location on iOS
        this.ibeacon.requestAlwaysAuthorization();
        // create a new delegate and register it with the native layer
        this.delegate = this.ibeacon.Delegate();

        // Subscribe to some of the delegate's event handlers
        this.delegate.didRangeBeaconsInRegion()
          .subscribe(
            (data: any) => {
              this.events.publish('didRangeBeaconsInRegion', data);
              // console.log('didRangeBeaconsInRegion: ', data)
            },
            (error: any) => {console.error()}
          );

        this.delegate.didStartMonitoringForRegion()
          .subscribe(
            (data: any) => console.log('didStartMonitoringForRegion: ', data),
            (error: any) => console.error()
          );

        this.delegate.didEnterRegion()
          .subscribe(
            (data: any) => {
              this.events.publish('didEnterRegion', data);
              console.log('didEnterRegion: ', data);
            }
          );

        this.delegate.didExitRegion()
          .subscribe(
            (data: any) => {
              this.events.publish('didExitRegion', data);
              console.log('didExitRegion: ', data);
            }
          );

        this.region = this.ibeacon.BeaconRegion('estimote', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D');
        // this.regions.push(this.ibeacon.BeaconRegion('room1', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D', 50801, 32832));
        // this.regions.push(this.ibeacon.BeaconRegion('room2', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D', 19370, 50555));
        // this.regions.forEach(val => {
          // this.ibeacon.startMonitoringForRegion(val)
          //   .then(
          //     () => console.log('Native layer recieved the request to monitoring'),
          //     error => console.error('Native layer failed to begin monitoring: ', error)
          //   );
        // });
      } else {
        console.error('This application needs to be running on a device');
        resolve(false);
      }
    });

    return promise;
  }

  stop(): void {
    this.ibeacon.stopRangingBeaconsInRegion(this.region)
      .then(
        () => console.log('Native layer recieved stop monitoring'),
        error => console.error('Native layer failed to stop monitoring: ', error)
      );
  }

  start(): void {
    this.ibeacon.startRangingBeaconsInRegion( this.region)
      .then(
        () => console.log('Native layer recieved the request to monitoring'),
        error => console.error('Native layer failed to begin monitoring: ', error)
      );
  }
}
