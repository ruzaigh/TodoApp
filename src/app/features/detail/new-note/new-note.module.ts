import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NewNoteComponent} from "./new-note.component";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [NewNoteComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class NewNoteModule{}
