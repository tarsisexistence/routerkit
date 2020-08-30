import { Note, Root } from 'routeshub';

/**
 * Describes App children routes
 */
export interface AppChildNotes extends Root {
  about: Note;
  car: Note;
}

/**
 * Describes App main routes
 */
export interface AppNotes {
  root: Note<AppChildNotes>;
}

/**
 * Declares identifier of module routes
 */
export const APP_NOTES_KEY = Symbol();
