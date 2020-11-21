import { SHOW_ALERT, HIDE_ALERT } from "./types";

const initialState = { visible: false, type: SHOW_ALERT, text: '' }

export const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...action.payload, visible: true }
        case HIDE_ALERT:
            return { ...state, visible: false }
        default:
            return state
    }
}

export const show = (text, type = 'warning') => ({
    type: SHOW_ALERT,
    payload: { text, type }
})

export const hide = () => ({ type: HIDE_ALERT })
// reducer - функция которая проверяет action type и в зависимости от этого возвращяет измененный state