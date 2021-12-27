import React, { useState } from 'react'

const Number = ({namn,nummer}) => {
  return (
    <div>
      <li>{namn} {nummer}</li>
    </div>
  )
}

const Persons = ({notesToShow}) => {
  return(
    <ul>
      {notesToShow.map(num => 
        <Number key={num.id} namn={num.name} nummer={num.number} />
      )}
    </ul>
  )
}

const Filter = ({newFilter,handleFilterChange}) => {
  return(
  <form >
    <div>filter shows with: <input value={newFilter} onChange={handleFilterChange} /></div>
  </form>
  )
}

const PersonSubmitter = ({addNumber,newName,newNumber,handleNameChange,handleNumberChange}) => {
  return(
  <form onSubmit={addNumber}>
    <div>name: <input value={newName} onChange={handleNameChange} /></div>
    <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
    <div>
        <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'044-236-2552', id:0}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const numObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    if(!persons.some((element) => element.name === newName )){
      setPersons(persons.concat(numObject))
      setNewName('')
      setNewNumber('')
    }else{
      window.alert(`${newName} is already added to phonebook`)
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const notesToShow = persons.filter( (element) => element.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h4>Add a new</h4>
      <PersonSubmitter addNumber={addNumber} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons notesToShow={notesToShow} />
    </div>
  )

}

export default App