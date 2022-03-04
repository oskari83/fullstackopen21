import { createSlice } from '@reduxjs/toolkit'

const initialFilter = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilter,
    reducers: {
      setFilter(state,action){
        const content = action.payload
        return state = content
      }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer