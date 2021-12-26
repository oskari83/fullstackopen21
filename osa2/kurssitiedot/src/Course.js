import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h3>{props.courseName}</h3>
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
      {osat.map(osa => 
        <Part key={osa.id} part={osa} />
      )}
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((sum, p) => {
    return sum+p.exercises
  },0)

  return (
    <div>
      <p><b>Total of {total} exercises</b></p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course