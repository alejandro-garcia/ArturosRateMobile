import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateStatusPageRoutingModule } from './update-status-routing.module';

import { UpdateStatusPage } from './update-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateStatusPageRoutingModule
  ],
  declarations: [UpdateStatusPage]
})
export class UpdateStatusPageModule {}
