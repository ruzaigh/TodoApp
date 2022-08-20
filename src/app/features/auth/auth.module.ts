import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.compoonent";
@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
