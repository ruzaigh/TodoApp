import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingController} from "@ionic/angular";
import {NoteService} from "../../service/note.service";

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
  })
  constructor(
    private loadingCrtl: LoadingController,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
  }

  addNote(){
    if(!this.form.valid){
      return;
    }
    this.loadingCrtl.create({
      message: 'Creating note...'
    })
      .then(loadingEl => {
        loadingEl.present();
        this.noteService.createNote(
        this.form.value.title ?? '',
        this.form.value.content ?? ''
          ).subscribe();
        loadingEl.dismiss();
      })
  }
}
