import { Injectable } from '@angular/core';
import { Note } from '../interface/note';
import {BehaviorSubject, map, of, switchMap, take, tap} from 'rxjs';
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
      this.auth.userId ?? ''
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

  updateNote(noteId: string, title: string, content: string){
    let updatedNotes: Note[];
    return this.notes.pipe(
      take(1),
      switchMap(notes => {
        if(!notes || notes.length <= 0){
          return this.fetchNotes();
        } else {
          return of(notes);
        }
      }),
      switchMap(notes => {
        const updatedNoteIndex = notes.findIndex(note => note.id === noteId);
        updatedNotes = [...notes];
        const oldNote = updatedNotes[updatedNoteIndex];
        updatedNotes[updatedNoteIndex] = new Note(
          oldNote.id,
          title,
          content,
          oldNote.userId
        );
        return this.http.put(`https://todoapp-75f25-default-rtdb.firebaseio.com/notes/${noteId}.json`,
          {...updatedNotes[updatedNoteIndex], id: null});
      }),
      tap(() => {
        this.notes.next(updatedNotes);
      })
    );
  }

  fetchNoteById(noteId: string){
    return this.http.get<NoteData>(`https://todoapp-75f25-default-rtdb.firebaseio.com/notes/${noteId}.json`)
      .pipe(
        map(noteData => new Note(
          noteId,
          noteData.title,
          noteData.content,
          noteData.userId ?? ''
        ))
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
                NoteData[key].userId ?? ''
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
