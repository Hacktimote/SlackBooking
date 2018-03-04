import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';

import { NavController, Platform, Events } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { find, remove, sortBy } from 'lodash';
import { Device } from '@ionic-native/device';

export interface IBeacon {
  uuid: string;
  major: string;
  minor: string;
}

export interface IRoom {
  _id?: string;
  name: string;
  beaconId: string;
  location: string;
  assets: string[];
  capacity: string;
  status: any;
  capacityName?: string;
  proximity?: string;
}

export interface IBooking {
  roomId: string;
  start: Date;
  end: Date;
  owner: string;
  invitees: string[];
}

export interface IRoomStore {
  rooms: IRoom[];
  nearBy: IRoom[];
}

@Injectable()
export class WorkspaceService {
  public rooms: Observable<IRoom[]>;
  public nearBy: Observable<IRoom[]>;
  private _rooms: BehaviorSubject<IRoom[]>;
  private _nearBy: BehaviorSubject<IRoom[]>;
  private baseUrl: string;
  private dataStore: IRoomStore;
  private url = `/api`;

  constructor(
      public events: Events,
      public device: Device,
      public http: HttpClient) {

    this.dataStore = { rooms: [], nearBy: [] };
    this._rooms = <BehaviorSubject<IRoom[]>>new BehaviorSubject([]);
    this._nearBy = <BehaviorSubject<IRoom[]>>new BehaviorSubject([]);
    this.rooms = this._rooms.asObservable();
    this.nearBy = this._nearBy.asObservable();

    this.events.subscribe('didRangeBeaconsInRegion', (data: any) => {
      // this.update(data)
      const beaconList = remove(data.beacons, (val: any) => {
        return val.proximity !== 'ProximityUnknown';
      });
      const beaconRooms: any = sortBy(beaconList, 'rssi');
      this.dataStore.nearBy = [];
      beaconRooms.forEach( (beacon: IBeacon) => {
        const room = find(this.dataStore.rooms, {beaconId: this.getBeaconId(beacon)});
        if (room) {
          this.dataStore.nearBy.push(room);
        }
      });
      this._nearBy.next(Object.assign({}, this.dataStore).nearBy);
    });
  }

  public loadAll() {
    this.http.get(`${this.url}/rooms`)
      .map( (rooms: IRoom[]) => {
        rooms.map( (room: IRoom) => {
          const cap = +room.capacity;
          if (cap <= 2) {
            room.capacityName = 'small';
          } else if (cap <= 5) {
            room.capacityName = 'medium';
          } else {
            room.capacityName = 'large';
          }
          return room;
        });

        return rooms;
      })
      .subscribe((data: IRoom[]) => {
        this.dataStore.rooms = data;
        this._rooms.next(Object.assign({}, this.dataStore).rooms);
    }, (error: any) => console.log('Could not load rooms.'));

    // this.dataStore.rooms = [
    //   {
    //     _id: '1234',
    //     name: 'test',
    //     beaconId: '1234',
    //     location: 'B3',
    //     assets: ['cool', 'big', 'big screen'],
    //     capacity: '20',
    //     status: null,
    //     capacityName: 'large'
    //   },
    //   {
    //     _id: '12343',
    //     name: 'test',
    //     beaconId: '12345',
    //     location: 'B3',
    //     assets: ['windows view', 'big screen'],
    //     capacity: '10',
    //     status: null,
    //     capacityName: 'medium'
    //   },
    //   {
    //     _id: '12346',
    //     name: 'test',
    //     beaconId: '12346',
    //     location: 'B3',
    //     assets: ['cool'],
    //     capacity: '3',
    //     status: null,
    //     capacityName: 'small'
    //   }
    // ];
    // this._rooms.next(Object.assign({}, this.dataStore).rooms);
  }

  public load(id: number | string) {
    this.http.get(`${this.url}/room/${id}`)
      .subscribe((data: IRoom) => {
        let notFound = true;
        this.dataStore.rooms.forEach((item, index) => {
          if (item.beaconId === data.beaconId) {
            this.dataStore.rooms[index] = data;
            notFound = false;
          }
        });
        if (notFound) {
          this.dataStore.rooms.push(data);
        }
        this._rooms.next(Object.assign({}, this.dataStore).rooms);
      }, error => console.log('Could not load room.'));
  }

  public book(room: IRoom) {
    const end = new Date();
    end.setHours(end.getHours() + 1);
    const data = {
      roomId: room._id,
      start: new Date(),
      end: end,
      owner: 'mobileApplication',
      invitees: [
        'my friends'
      ]
    };
    this.http.post(`${this.url}/booking`, room)
      .subscribe((res: any) => {
        this.dataStore.rooms.forEach((t, i) => {
          if (t._id === room._id) { this.dataStore.rooms[i].status = 'booked'; }
        });

        this._rooms.next(Object.assign({}, this.dataStore).rooms);
      }, error => console.log('Could not book the room.'));
  }

  private getBeaconId(beacon: IBeacon = null): string|null {
    // beaconId = `${beacon.minor}`;
    return beacon ? beacon.minor : null;
  }
}
