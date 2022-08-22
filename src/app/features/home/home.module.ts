import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {DetailComponent} from "../detail/detail.component";
import {IonicModule} from "@ionic/angular";

@NgModule({
    declarations: [
        HomeComponent,
        DetailComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
})
export class HomeModule {}
