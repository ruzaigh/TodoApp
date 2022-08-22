import { Injectable } from '@angular/core';
import { Note } from '../interface/note';
import {BehaviorSubject, map, switchMap, take, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../auth/services/auth.service";
import {NoteData} from "../interface/note.data";

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes = new BehaviorSubject<Note[]>([]);

  constructor(
    private http: HttpClient,
    public auth: AuthService,
  ) {}

 get notesList() {
    return this.notes.asObservable();

 }
  createNote(
    title: string,
    content: string
  ) {
    let gerneratedId: string;
    const newNote = new Note(
      Math.random().toString(),
      title,
      content,
      this.auth.userId
    );

    return this.http.post<{ name: string }>('https://todoapp-75f25-default-rtdb.firebaseio.com/notes.json',
        {...newNote, id: null})
      .pipe(
        switchMap((resData) => {
          gerneratedId = resData.name;
          return this.notes;
        }),
        take(1),
        tap(notes => {
          newNote.id = gerneratedId;
          this.notes.next(notes.concat(newNote));
        })
      );
  }

  fetchUserNotes(){
    return this.http.get<{[key: string]: NoteData}>(`https://todoapp-75f25-default-rtdb.firebaseio.com/notes.json?orderBy="userId"&equalTo="${this.auth.userId}"`)
      .pipe(
        map(NoteData =>{
          const notes = [];
          for (const key in NoteData){
            if(NoteData.hasOwnProperty(key)){
              notes.push(new Note(
                  key,
                  NoteData[key].title,
                  NoteData[key].content,
                  NoteData[key].userId
              ));
            }
          }
          return notes;
        }),
        tap(notes => {
          this.notes.next(notes);
        })
      );
  }

  fetchNotes(){
    return this.http.get<{[key: string]: NoteData}>('https://todoapp-75f25-default-rtdb.firebaseio.com/notes.json')
      .pipe(
        map(NoteData =>{
          const notes = [];
          for (const key in NoteData){
            if(NoteData.hasOwnProperty(key)){
              notes.push(new Note(
                key,
                NoteData[key].title,
                NoteData[key].content,
                NoteData[key].userId
              ));
            }
          }
          return notes;
        }),
        tap(notes => {
          this.notes.next(notes);
        })
      );
  }

  deleteNote(noteId: string){
    return this.http.delete(`https://todoapp-75f25-default-rtdb.firebaseio.com/notes/${noteId}.json`)
      .pipe(
        switchMap(() => {
          return this.notes;
        }),
        take(1),
        tap(notes => {
          this.notes.next(notes.filter(note => note.id !== noteId));
        })
      );
  }
}
