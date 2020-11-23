//@flow
import { SHOW_ALERT, HIDE_ALERT } from "./types";

const initialState: Object = { visible: false, type: SHOW_ALERT, text: '' }

export const alertReducer = (state: Object = initialState, action: Object): Object => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...action.payload, visible: true }
        case HIDE_ALERT:
            return { ...state, visible: false }
        default:
            return state
    }
}

export const show = (text: string, type: string = 'warning'): Object => ({
    type: SHOW_ALERT,
    payload: { text, type }
})

export const hide = (): Object => ({ type: HIDE_ALERT })
// reducer - функция которая проверяет action type и в зависимости от этого возвращяет измененный state