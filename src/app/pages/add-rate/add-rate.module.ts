import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRatePageRoutingModule } from './add-rate-routing.module';

import { AddRatePage } from './add-rate.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRatePageRoutingModule
  ],
  declarations: [AddRatePage]
})
export class AddRatePageModule {
   constructor(){

   }
   
}
