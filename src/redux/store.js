import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { alertReducer } from './alertReducer'
import { firebaseReducer } from './firebaseReducer'
import { sagaWatcher } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    alert: alertReducer,
    firebase: firebaseReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware))) // !вклинились в конвеер

sagaMiddleware.run(sagaWatcher)

export default store