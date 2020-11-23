import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { firebaseApi } from '../api/api'
import {
    REQUEST_NOTES, SHOW_LOADER, FETCH_NOTES, REQUEST_ADD_NOTE,
    ADD_NOTE, SHOW_ALERT, REMOVE_NOTE, REQUEST_REMOVE_NOTE
} from './types'

export function* sagaWatcher() {
    yield takeLatest(REQUEST_NOTES, fetchNotesSaga)
    yield takeEvery(REQUEST_ADD_NOTE, addNoteSaga)
    yield takeEvery(REQUEST_REMOVE_NOTE, removeNoteSaga)
}

function* fetchNotesSaga() {
    yield put({ type: SHOW_LOADER })
    const res = yield call(firebaseApi.getNotes)
    const payload = Object.keys(res.data).map(key => {
        return {
            ...res.data[key],
            id: key
        }
    })
    yield put({ type: FETCH_NOTES, payload })
}

function* addNoteSaga(action) {
    try {
        const res = yield call(firebaseApi.addNotes, action.note);
        yield put({
            type: ADD_NOTE,
            payload: {
                ...action.note,
                id: res.data.name
            }
        })
        yield put({
            type: SHOW_ALERT,
            payload: { text: 'Заметка была создана!', type: 'success' }
        })
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* removeNoteSaga(action) {
    try {
        const res = yield call(firebaseApi.removeNote, action.id);
        if (res.status === 200){
            yield put({
                type: REMOVE_NOTE,
                payload: action.id
            })
            yield put({
                type: SHOW_ALERT,
                payload: { text: 'Заметка успешно удалена!', type: 'success' }
            })
        }
        
    } catch (e) {
        console.log(e)
        yield put({ type: SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
