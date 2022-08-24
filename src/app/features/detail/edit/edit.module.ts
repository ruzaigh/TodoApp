import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EditComponent} from "./edit.component";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [EditComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class EditModule {}
