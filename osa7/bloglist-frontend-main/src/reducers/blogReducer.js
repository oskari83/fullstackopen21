import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        voteBlog(state,action){
          const id = action.payload
          const blogToChange = state.find(n => n.id === id)
          let num = blogToChange.likes + 1
          const changedBlog = {
            ...blogToChange,
            likes: num
          }
          return state.map(dote =>
            dote.id !== id ? dote : changedBlog
          )
        },
        appendBlog(state, action) {
          state.push(action.payload)
        },
        setBlogs(state, action) {
          return action.payload
        },
        removeBlog(state,action){
          return state.slice().filter(per => per.id !== action.payload)
        }
    },
})

export const { voteBlog, appendBlog, setBlogs, removeBlog } = blogSlice.actions

export default blogSlice.reducer