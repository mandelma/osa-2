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
    
  const [newName, setNewName] = useState('')
  
  const lue = () => persons.map(item => <Note
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
      name: newName
    }

    if(onKo(newName)){
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      return
    }else{
      setPersons(persons.concat(newObject))
    }
    setNewName("")
  }

  const inputHandler = (event) => {
    setNewName(event.target.value)
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
      <br/><br/>
    </div>
  );
}

export default App;
