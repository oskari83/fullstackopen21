import { createSlice } from '@reduxjs/toolkit'

const visibleSlice = createSlice({
    name: 'visible',
    initialState: [false,false],
    reducers: {
        setVisible(state, action){
          let newS = state
          newS[action.payload.id]=action.payload.value
          return newS
        }
    },
})

export const { setVisible } = visibleSlice.actions

export default visibleSlice.reducer