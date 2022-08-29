import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "../../service/note.service";
import {Note} from "../../interface/note";
import {LoadingController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public note!: Note;
  editForm = new FormGroup({
    title: new FormControl("", Validators.required),
    content: new FormControl("", Validators.required),
  })
  constructor(
    private router: ActivatedRoute,
    private noteService: NoteService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')){
        return;
      }
      const noteId = paramMap.get('id');
     this.noteService.fetchNoteById(noteId ?? '')
       .subscribe(note => {
         this.note = note
         this.editForm.patchValue({
            title: this.note.title ,
            content: this.note.content
          })
       })
    })
  }

  updateNote(){
    if(this.editForm.invalid){
      return;
    }
    this.noteService.updateNote(
      this.note.id ?? '',
      this.editForm.value.title ?? '',
      this.editForm.value.content ?? ''
    ).subscribe(() => {
      this.navCtrl.navigateBack('/home')
    })
  }

  deleteNote(){
    this.loadingCtrl.create({
      message: 'Deleting note...'
    }).then(loadingEl => {
      loadingEl.present();
      this.noteService.deleteNote(this.note.id).subscribe(() => {
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/home')
      })
    })
  }

}
