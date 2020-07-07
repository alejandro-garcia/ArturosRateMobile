import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'status', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'member', 
    canActivate: [AuthGuard],
    //loadChildren: () => import('./pages/add-rate/add-rate.module').then( m => m.AddRatePageModule)
    loadChildren: './pages/add-rate/member-routing.module#MemberRoutingModule'
  },
  {
    path: 'status',
    loadChildren: () => import('./pages/update-status/update-status.module').then( m => m.UpdateStatusPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
