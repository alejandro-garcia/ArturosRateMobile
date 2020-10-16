import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcludeRestPageRoutingModule } from './exclude-rest-routing.module';

import { ExcludeRestPage } from './exclude-rest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcludeRestPageRoutingModule
  ],
  declarations: [ExcludeRestPage]
})
export class ExcludeRestPageModule {}
