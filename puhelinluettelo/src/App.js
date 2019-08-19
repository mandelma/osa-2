import React, {useState, useEffect} from 'react'
import henkiloTiedot from "./service/personData"
import UusiHenkilo from "./UusiHenkilo"
import Filter from "./Filter"
import Persons from "./Persons"
import "./index.css"

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

const ErrorNotification = (props) => {
  if(props.errMessage === null){
    return null
  }
  return(
    <div className = "error">
      {props.errMessage}
    </div>
  )
}

const MessageNotification = (props) => {
  if(props.message === null){
    return null
  }
  return(
    <div className = "message">
      {props.message}
    </div>
  ) 
}

function App(props) {

  const [persons, setPersons] = useState([])
         
  const [newName, setNewName] = useState("")

  const [newNumber, setNewNumber] = useState("")

  const [filterName, setFilter] = useState("")

  const [message, setMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  
 
  const lue = () => persons.map(item =><Note
    key = {item.id}
    note = {item}
    del = {() => deletePerson(item.id, item.name)}
    />
  )

  const lueFilter = () => persons.filter(word => 
    word.name.toLowerCase().startsWith(filterName)).map(item =>
    <Note
      key = {item.id}
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

  
  let id = 0
  persons.forEach(element => {
    if(element.name === newName){
      id = element.id
    }
  });  

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)){
      henkiloTiedot
      .delPyynto(id)
      .then(() => {
        setPersons(persons.filter(i => i.id !== id))
        
        showMessage(`${name} is deleted, from phonebook`, setMessage)
        
      })
      .catch(error  => {
        showMessage(`information of ${name} is already removed from server`, setErrorMessage)
        setPersons(persons.filter(n => n.id !== id))
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

  const newContactOrUpdate = (event) => {
    event.preventDefault()
    if(onkoNimi(newName)){
      if(newNumber.length >= 8){
        updateNumero()
      }
      else{
        showMessage("Number should be at least 8 numbers long!", setErrorMessage)
        setNewName("")
        setNewNumber("")
      }
    }
    else{
      addNewContact()
    }
  }

  const addNewContact = () => {
    const newObject = {
      name: newName,
      number: newNumber
    }
    henkiloTiedot
      .create(newObject)
      .then(returnedNote => {
        setNewName("")
        setNewNumber("") 
        if(newNumber.length < 8){
          showMessage("Number should be at least 8 numbers long!", setErrorMessage)
          setPersons(persons.filter(n => n.name !== newName))
        }
        else if(newName.length < 3){
          showMessage("Name should be at least 3 characters long!", setErrorMessage)
          setPersons(persons.filter(n => n.name !== newName))
        }
        else{
          showMessage(`${newName} is added to phonebook`, setMessage)
          setPersons(persons.concat(returnedNote))
        }
      })
      .catch(error  => {
        showMessage(`Error adding new contact`, setErrorMessage)
        setPersons(persons.filter(n => n.name !== newName))
      })  
  }


  const updateNumero = () => {
    const note = persons.find(note => note.id === id)
    const newNote = {...note, number: newNumber}
    henkiloTiedot
    .update(id, newNote)
    .then(returnedNote => {
      alert(`${newName} is already added to phonebook. Replace the old number with a new one?`)
      setPersons(persons.map(item => item.id !== id ? item : returnedNote))
      showMessage(`New numero for ${newName} is set`, setMessage)
      setNewName("")
      setNewNumber("")
    })
    .catch(error  => {
      showMessage(`information of ${newName} is already removed from server`, setErrorMessage)
      setPersons(persons.filter(n => n.id !== id))
      setNewName("")
      setNewNumber("")
    })
  }

  const showMessage = (mess, setMessageStyle) => {
    setMessageStyle(mess)
    setTimeout(() => {
      setMessageStyle(null)
    }, 5000)
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
      <ErrorNotification 
        errMessage = {errorMessage}
        />
      <MessageNotification 
        message = {message}
      />
      <br/>
      <Filter
        onChange = {(event) => setFilter(event.target.value)}
      />
      <h2>add a new</h2>
      <UusiHenkilo 
        addPerson = {newContactOrUpdate}
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