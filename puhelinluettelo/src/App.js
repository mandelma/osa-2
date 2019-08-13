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

function App() {
  const [persons, setPersons] = useState([])
         
  const [newName, setNewName] = useState("")

  const [newNumber, setNewNumber] = useState("")

  const [filterName, setFilter] = useState("")

  const [message, setMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  
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
    console.log("Delete test")
    if(window.confirm(`Delete ${name} ?`)){
      
      henkiloTiedot
      .delPyynto(id)
      .then(returned => {
        setPersons(persons.filter(i => i.id !== id))
        if(errorMessage === null){
          setMessage(
            `${name} is deleted from phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        }
      })

      .catch(error  => {
        setErrorMessage(
          `info of ${name} is already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
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

  const onkoNumero = (value) => {
    for(let i = 0; i < persons.length; i++){
      if(persons[i].number === value){
        return true
      } 
    }
    return false
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }

    let id = 0
    persons.forEach(element => {
      if(element.name === newName){
        id = element.id
      }
    });

    if(onkoNimi(newName) || onkoNumero(newNumber)){
      //alert(`${newName} is already added to phonebook`)
      setErrorMessage(
                `Nimi ja numero on jo kirjassa`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
      // replace the old number with a new one?
      //const note = persons.find(note => note.id === id)
      //const newNote = {...note, number: newNumber}
      
      //henkiloTiedot
      //  .update(id, newNote)
      //  .then(returnedNote => {
      //    setPersons(persons.map(item => item.id !== id ? item : returnedNote))

      //  if(errorMessage === null){
      //      setMessage(
      //        `${newName} new number is set`
      //      )
      //      setTimeout(() => {
      //        setMessage(null)
      //      }, 3000)
      //    }
      //    setNewName("")
      //    setNewNumber("")
      //    })
      //    .catch(error  => {
      //      setErrorMessage(
      //        `information of ${newName} is already removed from server`
      //      )
      //      setTimeout(() => {
      //        setErrorMessage(null)
      //      }, 3000)
      //      setPersons(persons.filter(n => n.id !== id))
      //    })  
          setNewName("")
          setNewNumber("")
          
    }else{
      henkiloTiedot
        .create(newObject)
          .then(returnedNote => {
            setPersons(persons.concat(returnedNote))
            setNewNumber("")
            setMessage(
              `${newName} is added to phonebook`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          setNewName("")
          setNewNumber("")  
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
