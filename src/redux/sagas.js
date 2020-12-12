import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import { firebaseApi } from '../api/api'
import {
    REQUEST_NOTES, CHANGE_LOADER, FETCH_NOTES, REQUEST_ADD_NOTE,
    ADD_NOTE, SHOW_ALERT, REMOVE_NOTE, REQUEST_REMOVE_NOTE, HIDE_ALERT,
    REQUEST_COMPLETE_NOTE, COMPLETE_NOTE, REQUEST_PROJECTS, REQUEST_ADD_PROJECT, ADD_PROJECT,
    REQUEST_REMOVE_PROJECT, REMOVE_PROJECT, FETCH_PROJECT, ADD_USER_TO, SUCC_ADDING,
    CHANGE_SETTINGS, REQUEST_UPDATE_SETTINGS,
} from './types'

export function* sagaWatcher() {
    yield takeLatest(REQUEST_NOTES, fetchNotesSaga)
    yield takeEvery(REQUEST_ADD_NOTE, addNoteSaga)
    yield takeEvery(REQUEST_REMOVE_NOTE, removeNoteSaga)
    yield takeEvery(SHOW_ALERT, showAlertSaga)
    yield takeEvery(REQUEST_COMPLETE_NOTE, changeCompleteSaga)
    yield takeEvery(REQUEST_PROJECTS, fetchProjectsSaga)
    yield takeEvery(REQUEST_ADD_PROJECT, addProjectSaga)
    yield takeEvery(REQUEST_REMOVE_PROJECT, removeProjectSaga)
    yield takeEvery(ADD_USER_TO, addUserToProjectSaga)
    yield takeEvery(REQUEST_UPDATE_SETTINGS, changeProjectSaga)
}

function* fetchNotesSaga(action) {
    yield put({ type: CHANGE_LOADER, payload: { loading: true } })
    const res = yield call(firebaseApi.getNotes, action.projectID)
    let payload = []
    if (res.data) {payload = Object.keys(res.data).map(key => ({ ...res.data[key], id: key }))
    }
    yield put({ type: FETCH_NOTES, payload })
    yield put({ type: CHANGE_LOADER, payload: { loading: false } })

}

function* fetchProjectsSaga(action) {
    yield put({ type: CHANGE_LOADER, payload: { loading: true } })
    const res = yield call(firebaseApi.getProjects, action.userID)
    let payload = []
    if (res.data) {
        payload = Object.keys(res.data).filter(key => res.data[key].followingUsers.includes(action.userID)).map(key => ({...res.data[key], id: key}))
    }
    
    yield put({ type: FETCH_PROJECT, payload })
    yield put({ type: CHANGE_LOADER, payload: { loading: false } })

}
function* addNoteSaga(action) {
    try {
        const res = yield call(firebaseApi.addNotes, action.note, action.projectID);
        yield put({
            type: ADD_NOTE,
            payload: {
                ...action.note,
                id: res.data.name
            }
        })
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* addProjectSaga(action) {
    try {
        const res = yield call(firebaseApi.addProject, action.project);
        yield put({
            type: ADD_PROJECT,
            payload: {
                ...action.project,
                id: res.data.name
            }
        })
        yield put({
            type: SHOW_ALERT,
            payload: { text: 'Проект был создан!', type: 'success' }
        })
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* removeProjectSaga(action) {
    try {
        const res = yield call(firebaseApi.removeProject, action.projectID);
        if (res.status === 200) {
            yield put({
                type: REMOVE_PROJECT,
                payload: action.projectID
            })
            yield put({ type: SHOW_ALERT, payload: { text: 'Проект успешно удален', type: 'success' } })

        }
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* removeNoteSaga(action) {
    try {
        const res = yield call(firebaseApi.removeNote, action.projectID, action.noteID);
        if (res.status === 200) {
            yield put({
                type: REMOVE_NOTE,
                payload: action.noteID
            })
            // yield put({
            //     type: SHOW_ALERT,
            //     payload: { text: 'Заметка успешно удалена!', type: 'success' }
            // })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* changeProjectSaga(action) {
    try {
        const res = yield call(firebaseApi.changeSettings, action.project, action.payload);
        if (res.status === 200) {
            yield put({
                type: CHANGE_SETTINGS,
                project: {...action.project, ...action.payload}
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* showAlertSaga() {
    yield delay(2500)
    yield put({ type: HIDE_ALERT })
}
function* changeCompleteSaga(action) {
    try {
        const res = yield call(firebaseApi.changeComplete, action.note, action.projectID)
        if (res.status === 200) {
            yield put({
                type: COMPLETE_NOTE,
                payload: action.note.id
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* addUserToProjectSaga(action) {
    try {
        const res = yield call(firebaseApi.addUserToProject, action.project, action.userID)
        if (res.status === 200) {
            yield put({
                type: SUCC_ADDING,
                payload: {project: action.project, userID: action.userID}
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
