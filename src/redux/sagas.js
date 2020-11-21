import { call, put, takeEvery } from 'redux-saga/effects'
import { firebaseApi } from '../api/api'
import { REQUEST_NOTES, SHOW_LOADER, FETCH_NOTES } from './types'

export function* sagaWatcher() {
    yield takeEvery(REQUEST_NOTES, fetchNotesSaga)
}

function* fetchNotesSaga() {
    yield put({type: SHOW_LOADER})
    const res = yield call(fetchNotes)
    const payload = Object.keys(res.data).map(key => {
        return {
            ...res.data[key],
            id: key
        }
    })
    yield put({ type: FETCH_NOTES, payload })
}

const fetchNotes = async() => {
    let res = await firebaseApi.getNotes();
    console.log(res);
    return res
}

// const fetchNotes = async () => {
//     showLoader();
//     const res = await axios.get(`${url}/notes.json`);

//     const payload = Object.keys(res.data).map(key => {
//         return {
//             ...res.data[key],
//             id: key
//         }
//     })

//     dispatch({ type: FETCH_NOTES, payload })
// }
