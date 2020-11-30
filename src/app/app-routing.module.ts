import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnauthenticatedGuard} from "./utils/guards/unauthenticated.guard";
import {AuthenticatedGuard} from "./utils/guards/authenticated.guard";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/public/public.module').then(m => m.PublicModule),
    //canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  //  canActivate: [AuthenticatedGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/login'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
