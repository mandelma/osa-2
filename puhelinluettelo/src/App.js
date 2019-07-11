import React, {useState, useEffect} from 'react'

import UusiHenkilo from "./UusiHenkilo"
import Filter from "./Filter"
import Persons from "./Persons"
import Axios from 'axios';

const Note = (props) => {
  return(
    <div>
      <li>
        {props.note.name} {props.note.number}
      </li>
    </div>
  )
}

function App() {
  const getData = () => {
    Axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }

  useEffect(getData, [])
  
  const [persons, setPersons] = useState([
    

  ])

  
    
  const [newName, setNewName] = useState("")

  const [newNumber, setNewNumber] = useState("")

  const [filterName, setFilter] = useState("")
  
  const lue = () => persons.map(item => <Note
    key = {item.name}
    note = {item}
  />)

  const lueFilter = (taht) => persons.filter(word => 
    word.name[0] === taht.toUpperCase()).map(item =>
    <Note
      key = {item.name}
      note = {item} 
    />)

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
      setPersons(persons.concat(newObject))
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
        showPersons =  {filterName.length > 0 ? lueFilter(filterName) : lue()}
      /> 
    </div>
  );
}

export default App;
