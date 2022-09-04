import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.compoonent";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./store/effects/auth.effects";
import {authReducer} from "./store/reducers/auth.reducers";
@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    StoreModule.forFeature('todo-auth', authReducer),
    EffectsModule.forFeature([AuthEffects])

  ]
})
export class AuthModule { }
