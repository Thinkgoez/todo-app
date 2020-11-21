import React, {useReducer} from 'react';
import { AlertContext } from './alertContext';
import {alertReducer} from './alertReducer';
import { SHOW_ALERT, HIDE_ALERT } from '../../redux/types';


export const AlertState = ({children}) => {
    const [state, dispathc] = useReducer(alertReducer, {visible:false})

    const show = (text, type = 'warning') => {
        dispathc({
            type: SHOW_ALERT,
            payload: {text, type}
        })
    }

    const hide = () => dispathc({type: HIDE_ALERT})

    return(
        <AlertContext.Provider value={{
            show, hide,
            alert: state
        }}>
            {children}
        </AlertContext.Provider>
    );
}