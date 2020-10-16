import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcludeRestPage } from './exclude-rest.page';

const routes: Routes = [
  {
    path: '',
    component: ExcludeRestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcludeRestPageRoutingModule {}
