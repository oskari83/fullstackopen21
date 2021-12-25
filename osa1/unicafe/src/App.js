import React, { useState } from 'react'

const StatisticLine = ({text,v1,v2,v3}) => {
  let value = 0

  if(text==="Good: "){
    value=v1
  }
  if(text==="Neutral: "){
    value=v2
  }
  if(text==="Bad: "){
    value=v3
  }
  if(text==="All: "){
    value=v1+v2+v3
  }
  if(text==="Average: "){
    value=(v1+(v3*-1)) / (v1+v2+v3)
  }
  if(text==="Positive: "){
    value=(v1 / (v1+v2+v3))*100
    return(
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }

  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,bad}) => {
  if ((good+neutral+bad)>0){
    return (
      <div>
        <h4>STATISTICS</h4> 
        <table>
          <tbody>
            <StatisticLine text={"Good: "} v1={good} v2={neutral} v3={bad} />
            <StatisticLine text={"Neutral: "} v1={good} v2={neutral} v3={bad} />
            <StatisticLine text={"Bad: "} v1={good} v2={neutral} v3={bad} />
            <StatisticLine text={"All: "} v1={good} v2={neutral} v3={bad} />
            <StatisticLine text={"Average: "} v1={good} v2={neutral} v3={bad} />
            <StatisticLine text={"Positive: "} v1={good} v2={neutral} v3={bad} />
          </tbody>
        </table>
      </div>
    )
  }
  return(
    <div>
      <p>No feedback given</p>
    </div>
  )
  
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h4>GIVE FEEDBACK</h4> 
      <Button handleClick={() => setGood(good + 1)} text={"Good"} /> 
      <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} /> 
      <Button handleClick={() => setBad(bad + 1)} text={"Bad"} /> 
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
