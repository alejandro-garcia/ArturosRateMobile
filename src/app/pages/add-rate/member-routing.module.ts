import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'add', loadChildren: './add-rate.module#AddRatePageModule' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {
constructor(){
   console.log("dentro del constructor de MemberRoutingModule")
}
}
