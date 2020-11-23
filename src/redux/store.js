import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { alertReducer } from './alertReducer'
import { firebaseReducer } from './firebaseReducer'
import { sagaWatcher } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    alert: alertReducer,
    firebase: firebaseReducer,
})

const store = createStore(reducers, applyMiddleware(sagaMiddleware)) // !вклинились в конвеер

sagaMiddleware.run(sagaWatcher)

export default store