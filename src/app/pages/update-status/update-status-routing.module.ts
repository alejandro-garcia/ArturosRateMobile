import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateStatusPage } from './update-status.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateStatusPageRoutingModule {}
