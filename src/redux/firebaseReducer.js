//@flow
import {
    CHANGE_LOADER, REQUEST_NOTES, FETCH_NOTES, REQUEST_ADD_NOTE, ADD_NOTE,
    REQUEST_REMOVE_NOTE, REMOVE_NOTE, REQUEST_COMPLETE_NOTE, COMPLETE_NOTE,
    REQUEST_PROJECTS, REQUEST_ADD_PROJECT, ADD_PROJECT, REQUEST_REMOVE_PROJECT,
    REMOVE_PROJECT, FETCH_PROJECT, SET_CURRENT_PROJECT, ADD_USER_TO, CLEAR_DATA,
    REQUEST_UPDATE_SETTINGS, CHANGE_SETTINGS, SET_USER_ID
} from './types';


const initialState = {
    notes: [],
    projects: [],
    loading: false,
    currentProject: {},
    userID: null
}

export const firebaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOADER:
            return { ...state, ...action.payload }
        case ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, { ...action.payload }]
            }
        case FETCH_NOTES:
            return { ...state, notes: action.payload }
        case FETCH_PROJECT:
            return { ...state, projects: action.payload }
        case REMOVE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        case REMOVE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                currentProject: {}
            }
        case COMPLETE_NOTE:
            return {
                ...state,
                notes: state.notes.map(note => { if (note.id === action.payload) note.completed = !note.completed; return note })
            }
        case SET_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: state.projects.find(proj => proj.id === action.projectID),
            }
        case CHANGE_SETTINGS:
            return {
                ...state,
                projects: state.projects.map(project => { if (project.id === action.project.id) return action.project; return project }),
                currentProject: action.project
            }
        case CLEAR_DATA:
            return {
                ...state,
                notes: [],
                projects: [],
                loading: false,
                currentProject: {},
                userID: null
            }
        case SET_USER_ID:
            return {...state, ...action.payload }
        default:
            return state;
    }
}

export const showLoader = () => ({ type: CHANGE_LOADER, payload: { loading: true } })
export const fetchNotes = (projectID) => ({ type: REQUEST_NOTES, projectID })
export const fetchProjects = (userID) => ({ type: REQUEST_PROJECTS, userID })
export const removeNote = (projectID, noteID) => ({ type: REQUEST_REMOVE_NOTE, projectID, noteID })
export const addNote = (title, projectID) => ({ type: REQUEST_ADD_NOTE, note: { title, date: new Date().toJSON(), completed: false }, projectID })
export const addProject = (title, description, userID) => ({ type: REQUEST_ADD_PROJECT, project: { title, date: new Date().toJSON(), description, followingUsers: [userID], owner: userID } })
export const onChangeCompleteNote = (note, projectID) => ({ type: REQUEST_COMPLETE_NOTE, note, projectID })
export const removeProject = (projectID) => ({ type: REQUEST_REMOVE_PROJECT, projectID })
export const setCurrentProject = (projectID) => ({ type: SET_CURRENT_PROJECT, projectID })
export const addUserToProject = (project, userID) => ({ type: ADD_USER_TO, project, userID })
export const setNewSettings = (project, title) => ({ type: REQUEST_UPDATE_SETTINGS, project, payload: { title } })

export const setUserID = (userID) => ({
    type: SET_USER_ID,
    payload: { userID }
})
export const clearData = () => ({ type: CLEAR_DATA })




