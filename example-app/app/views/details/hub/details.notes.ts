import { Note } from 'routeshub';

export interface DetailsNotes {
  details: Note;
  info: Note;
}

export const DETAILS_NOTES_KEY = Symbol();
