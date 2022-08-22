import { Component, OnInit } from '@angular/core';
import {NoteService} from "../service/note.service";
import {NoteData} from "../interface/note.data";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public notes!: NoteData[];
  constructor(
    private notesSer: NoteService
  ) { }

  ngOnInit(): void {
    this.notesSer.fetchNotes().subscribe(note =>{
      this.notes = note;
    })
  }
}
