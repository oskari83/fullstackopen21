import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { cancelNotification, setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter===''){
      return state.anecdotes.slice().sort(function (blg, blg2) {
        return parseInt(blg2.votes) - parseInt(blg.votes)
      })
    }
    return state.anecdotes.slice().filter( (element) => element.content.toLowerCase().includes(state.filter.toLowerCase())).slice().sort(function (blg, blg2) {
      return parseInt(blg2.votes) - parseInt(blg.votes)
    })
  })

  const clickVoteHandler = (anec) => {
    dispatch(vote(anec))
    cancelNotification()
    dispatch(setNotification(`You voted "${anec.content}"`,3000))
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => clickVoteHandler(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList