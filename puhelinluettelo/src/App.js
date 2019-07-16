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

  const onkoNimi = (value) => {
    for(let i = 0; i < persons.length; i++){
      if(persons[i].name === value){
        return true
      } 
    }
    return false
  }

  const onkoNumero = (value) => {
    for(let i = 0; i < persons.length; i++){
      if(persons[i].number !== value){
        return true
      } 
    }
    return false
  }

  let id = 0

  persons.forEach(element => {
    if(element.name === newName){
      id = element.id
    }
  });


  const addPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }

    if(onkoNimi(newName) && onkoNumero(newNumber)){
      alert(`${newName} is already added to phonebook,
      replace the old number with a new one?`)
      const note = persons.find(note => note.id === id)
      const newNote = {...note, number: newNumber}
      henkiloTiedot
        .update(id, newNote)
        .then(returnedNote => {
          setPersons(persons.map(item => item.id !== id ? item : returnedNote))
          setNewName("")
          setNewNumber("")
      })
    }else{
      henkiloTiedot
        .create(newObject)
          .then(returnedNote => {
            setPersons(persons.concat(returnedNote))
            setNewName("")
            setNewNumber("")
          })
    }
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
        addPerson = {addPerson}
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
