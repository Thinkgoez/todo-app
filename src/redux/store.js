import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'
import { alertReducer } from './alertReducer'
import { firebaseReducer } from './firebaseReducer'
import { sagaWatcher } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    alert: alertReducer,
    firebase: firebaseReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware))) // !вклинились в конвеер

sagaMiddleware.run(sagaWatcher)

export default store