import { createSlice } from '@reduxjs/toolkit'

const initialNot = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNot,
    reducers: {
      setMessage(state,action){
        const content = action.payload
        return state = content
      },
      removeMessage(state,action){
        const empty = action.payload
        return state = empty
      }
    },
})

export const { setMessage,removeMessage } = notificationSlice.actions

let timeoutID;

export const setNotification = (str, time) => {
    return dispatch => {
        dispatch(setMessage(str))
        timeoutID = setTimeout(() => {
            dispatch(removeMessage(''))
        }, time)
      }
}

export const cancelNotification = () => {
    clearTimeout(timeoutID)
}

export default notificationSlice.reducer