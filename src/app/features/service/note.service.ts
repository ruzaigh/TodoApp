import { Injectable } from '@angular/core';
import { Note } from '../interface/note';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes = new BehaviorSubject<Note[]>([]);

  constructor(private http: HttpClient) {}

  createNote(
    title: string,
    content: string
  ) {
    debugger
    let gerneratedId: string;
    const newNote = new Note(
      Math.random().toString(),
      title,
      content
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
}
