import React, {useState} from 'react'

const Note = (props) => {
  return(
    <div>
      <li>
        {props.note.name}
      </li>
    </div>
  )
}

function App() {
  const [persons, setPersons] = useState([
    {name: 'Arto Hallas'}
  ])
    
  const [newName, setNewNAme] = useState('')
  
  const lue = () => persons.map(item => <Note
    key = {item.name}
    note = {item}
  />)

  const addName = (event) => {
    event.preventDefault()
    const inputObject = {
      name: newName
    }
    setPersons(persons.concat(inputObject))
    setNewNAme("")
  }

  const inputHandler = (event) => {
    setNewNAme(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
          <div>
            name: <input 
              value = {newName}
              onChange = {inputHandler}
            />
        </div>
        <div>
          <button type = "submit"
          >
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>  
      {lue()}  
    </div>
  );
}

export default App;
