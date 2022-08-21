import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {AuthComponent} from "./features/auth/auth.compoonent";
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard";
import {EditComponent} from "./features/detail/edit/edit.component";
import {NewNoteComponent} from "./features/detail/new-note/new-note.component";

const redirectToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    component: AuthComponent,
    pathMatch: 'full',
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
  },
  {
    path: 'note',
    children: [
      {
        path: 'new',
        loadChildren: () => import('./features/detail/new-note/new-note.module').then(m => m.NewNoteModule),
        component: NewNoteComponent
      },
      {
        path: 'note/:id',
        loadChildren: () => import('./features/detail/edit/edit.module').then(m => m.EditModule),
        component: EditComponent,
      }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
