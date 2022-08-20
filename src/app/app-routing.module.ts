import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {AuthComponent} from "./features/auth/auth.compoonent";
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard";

const redirectToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    component: AuthComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    component: AuthComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    component: HomeComponent,
    ...canActivate(redirectToLogin)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
