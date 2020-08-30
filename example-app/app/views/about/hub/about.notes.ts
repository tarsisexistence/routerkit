import { Note } from 'routeshub';

/**
 * Describes About note which contains
 * only one route with root key
 */
export interface AboutNotes {
  root: Note;
}

/**
 * unique local hubs key
 */
export const ABOUT_NOTES_KEY = Symbol();
