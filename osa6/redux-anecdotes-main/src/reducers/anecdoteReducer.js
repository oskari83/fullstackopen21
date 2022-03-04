import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state,action){
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      let num = anecdoteToChange.votes + 1
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: num
      }
      return state.map(dote =>
        dote.id !== id ? dote : changedAnecdote 
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content, getId(), 0)
    dispatch(appendAnecdote(newAnec))
  }
}

export const vote = (obj) => {
  const newUpdatedAnecdote = {
    content: obj.content,
    id: obj.id,
    votes: obj.votes + 1
  }
  return async dispatch => {
    const updated = await anecdoteService.update(obj.id, newUpdatedAnecdote)
    console.log(updated)
    dispatch(voteAnecdote(obj.id))
  }
}

export default anecdoteSlice.reducer