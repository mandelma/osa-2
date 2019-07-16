import React, {useState, useEffect} from 'react'
import henkiloTiedot from "./service/personData"

import UusiHenkilo from "./UusiHenkilo"
import Filter from "./Filter"
import Persons from "./Persons"

const Note = (props) => {
  return(
    <div>
      <li>
        {props.note.name} {props.note.number}
        <button onClick = {props.del}>Delete</button>
      </li>
      
    </div>
  )
}

function App() {
  const [persons, setPersons] = useState([])
         
  const [newName, setNewName] = useState("")

  const [newNumber, setNewNumber] = useState("")

  const [filterName, setFilter] = useState("")
  
  const lue = () => persons.map(item => <Note
    key = {item.name}
    note = {item}
    del = {() => deletePerson(item.id, item.name)}
  />)

  useEffect(() => {
    henkiloTiedot
      .getAll()
        .then(initialNotes => {
          setPersons(initialNotes)
        })
  }, [])

  const lueFilter = () => persons.filter(word => 
    word.name.toLowerCase().startsWith(filterName)).map(item =>
    <Note
      key = {item.name}
      note = {item}
      del = {() => deletePerson(item.id, item.name)}
    />)

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)){
      henkiloTiedot
      .delPyynto(id)
      .then(returned => {
        setPersons(persons.filter(i => i.id !== id))
      })
    }
    
    
  }

  const onKo = (value) => {
    for(let i = 0; i < persons.length; i++){
      if(persons[i].name === value){
        return true
      } 
    }
    return false
  }

  const addName = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    
    if(onKo(newName)){
      alert(`${newName} is already added to phonebook`)
      setNewName("")
    }else{
      henkiloTiedot
        .create(newObject)
          .then(returnedNote => {
            setPersons(persons.concat(returnedNote))
            setNewName("")
            setNewNumber("")
          })
    }
    
    setNewName("")
    setNewNumber("")
  }

  const nameHandler = (event) => {
    setNewName(event.target.value)
  
  }

  const numberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        onChange = {(event) => setFilter(event.target.value)}
      />
      <h2>add a new</h2>
      <UusiHenkilo 
        addName = {addName}
        newName = {newName}
        newNumber = {newNumber}
        nameHandler = {nameHandler}
        numberHandler = {numberHandler}
      />
      <h2>Numbers</h2> 
      <Persons
        showPersons =  {filterName.length > 0
        ? lueFilter() : lue()}
      /> 
    </div>
  );
}

export default App;
