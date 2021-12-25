import React, { useState } from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getLargest(arr) {
  let largest = arr[0]
  let lInd = 0

  for (let i = 0; i < arr.length; i++) {
    if (largest < arr[i] ) {
      largest = arr[i];
      lInd = i
    }
  }
  return lInd
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  let n = 7
  let a = Array(n).fill(0)
  const [votes, setVotes] = useState(a)
  const [selected, setSelected] = useState(0)

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1  
    setVotes(copy)
  }

  const handleAnecdote = () => {
    setSelected(getRandomInt(0,anecdotes.length))
  }

  return (
    <div>
      <h4>ANECDOTE OF THE DAY</h4>
      <p>{anecdotes[selected]}</p>
      <Button text={"Vote"} handleClick={handleVote} />
      <Button text={"Next Anecdote"} handleClick={handleAnecdote} />
      <h4>ANECDOTE WITH MOST VOTES</h4>
      <p>{anecdotes[getLargest(votes)]}</p>
    </div>
  )
}

export default App
