import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const namn = "pekka"
  const ika = 19
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="maya" age={ika+10}/>
      <Hello name={namn} age={ika}/>
    </div>
  )
}

export default App
