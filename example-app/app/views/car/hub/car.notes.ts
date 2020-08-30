import { Note } from 'routeshub';

export interface CarNotes {
  root: Note;
  year: Note;
}

export const CAR_NOTES_KEY = Symbol();
