import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { LoaderComponent } from './loader/loader.component';
import { RoomComponent } from './room/room.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    RoomComponent
  ],
  exports: [
    LoaderComponent,
    RoomComponent
  ]
})
export class SharedModule { }
