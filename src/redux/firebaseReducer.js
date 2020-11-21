//@flow
import axios from 'axios';
import { firebaseApi } from '../api/api'
import { SHOW_LOADER, REQUEST_NOTES, FETCH_NOTES} from './types';

const url = "https://react-note-be61d.firebaseio.com";

const ADD_NOTE = 'ADD_NOTE',
    REMOVE_NOTE = 'REMOVE_NOTE';

type ShowLoader = { type: SHOW_LOADER }
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type Action = ShowLoader

type State = {
    notes: ?Array<{
        id: string,
        title: string,
        date: string
    }>,
    loading: boolean
}

const initialState: State = {
    notes: [],
    loading: false
}

export const firebaseReducer = (state: State = initialState, action: Action) => {
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
        default:
            return state;
    }
}

export const showLoader = (): ShowLoader => ({ type: SHOW_LOADER })

export const fetchNotes = () => async (dispatch) => {
    // showLoader();
    // const res = await axios.get(`${url}/notes.json`);

    // const payload = Object.keys(res.data).map(key => {
    //     return {
    //         ...res.data[key],
    //         id: key
    //     }
    // })

    dispatch({ type: REQUEST_NOTES })
}

export const addNote = title => async dispatch => {
    const note = {
        title, date: new Date().toJSON()
    }

    try {
        const res = await axios.post(`${url}/notes.json`, note);
        const payload = {
            ...note,
            id: res.data.name
        }

        dispatch({
            type: ADD_NOTE,
            payload
        })

    } catch (e) {
        throw new Error(e.message);
    }

}

export const removeNote = id => async (dispatch) => {
    await firebaseApi.delete(id);

    dispatch({
        type: REMOVE_NOTE,
        payload: id
    })
}