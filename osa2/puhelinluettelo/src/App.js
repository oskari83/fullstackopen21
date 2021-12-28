import React, { useState, useEffect } from 'react'
import numService from './services/Numbers'

const Number = ({namn,nummer,deleteClick,id}) => {
  return (
    <div>
      <li>{namn} {nummer}<button onClick={()=> deleteClick(id,namn)}>
        delete
      </button></li>
    </div>
  )
}

const Persons = ({notesToShow,deleteClick}) => {
  return(
    <ul>
      {notesToShow.map((num,index) => 
        <Number key={num.id} namn={num.name} nummer={num.number} deleteClick={deleteClick} id={num.id}/>
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

  const deleteNumber = (idd,name) => {
    if(window.confirm(`Delete ${name}?`)){
      numService
      .remove(idd)
      .then(delNum => {
        setPersons(persons.filter(per => per.id !== idd))
      })
    }
  }

  const addNumber = (event) => {
    event.preventDefault()
    const numObject = {
      name: newName,
      number: newNumber,
    }

    if(!persons.some((element) => element.name === newName )){
      numService
      .create(numObject)
      .then(returnedNum => {
        setPersons(persons.concat(returnedNum))
        setNewNumber('')
        setNewName('')
      })
    }else{
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const num = persons.find(name => name.name===newName)
        const changedNum = {...num,number:newNumber}

        numService
        .update(changedNum.id,changedNum)
        .then(updatetNum => {
          setPersons(persons.map(number => number.id!==num.id ? number : updatetNum))
        })
      }
    }
  }

  useEffect(() => {
    numService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

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
      <Persons notesToShow={notesToShow} deleteClick={deleteNumber} />
    </div>
  )
}

export default App