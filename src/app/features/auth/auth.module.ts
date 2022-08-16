import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {IonicModule} from "@ionic/angular";
@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AuthModule { }
