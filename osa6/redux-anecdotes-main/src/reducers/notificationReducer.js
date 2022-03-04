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
export default notificationSlice.reducer