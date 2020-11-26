//@flow
import {
    SHOW_LOADER, REQUEST_NOTES, FETCH_NOTES, REQUEST_ADD_NOTE, ADD_NOTE,
    REQUEST_REMOVE_NOTE, REMOVE_NOTE, REQUEST_COMPLETE_NOTE, COMPLETE_NOTE
} from './types';

type ShowLoader = { type: string }
type FetchNotes = { type: string }
type RemoveNote = { type: string, id: string }
type AddNote = { type: string, note: { title: string, completed: Boolean, date: string } }

type State = {
    notes: Array<{
        id: string,
        title: string,
        date: string
    }>,
    loading: boolean
}

const initialState: Object = {
    notes: [],
    loading: false
}

export const firebaseReducer = (state: State = initialState, action: Object): Object=> {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true }
        case ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        case FETCH_NOTES:
            return { ...state, notes: action.payload, loading: false }
        case REMOVE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        case COMPLETE_NOTE:
            return {
                ...state,
                notes: state.notes.map(note => {if(note.id === action.payload) note.completed = !note.completed; return note})
            }
        default:
            return state;
    }
}

export const showLoader = (): ShowLoader => ({ type: SHOW_LOADER })
export const fetchNotes = (): FetchNotes => ({ type: REQUEST_NOTES })
export const removeNote = (id: string): RemoveNote => ({ type: REQUEST_REMOVE_NOTE, id })
export const addNote = (title: string): AddNote => ({ type: REQUEST_ADD_NOTE, note: { title, date: new Date().toJSON(), completed: false } })
export const onChangeCompleteNote = (note: Object): RemoveNote => ({ type: REQUEST_COMPLETE_NOTE, note })