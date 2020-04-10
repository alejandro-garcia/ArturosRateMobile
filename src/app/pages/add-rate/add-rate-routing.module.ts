import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRatePage } from './add-rate.page';

const routes: Routes = [
  {
    path: '',
    component: AddRatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRatePageRoutingModule {}
