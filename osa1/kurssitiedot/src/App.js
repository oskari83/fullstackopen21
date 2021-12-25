import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Part = (props) => {
  const osa = props.part
  return (
    <div>
      <p>
        {osa.name} {osa.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  const osat = props.parts
  return (
    <div>
      <Part part={osat[0]} />
      <Part part={osat[1]} />
      <Part part={osat[2]} />
    </div>
  )
}

const Total = (props) => {
  const osat = props.parts
  return (
    <div>
      <p>Number of exercises {osat[0].exercises + osat[1].exercises + osat[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App