import { Note } from 'routeshub';

export interface UsersChildNotes {
  id: Note;
  profile: Note;
}

export interface UsersNotes {
  users: Note;
}

export const USERS_NOTES_KEY = Symbol();
