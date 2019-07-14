import React, {useState, useEffect} from 'react'
import Axios from 'axios';

const Tiedot = (props) => {
  return(
    <div>
      {props.read}
    </div>
  )
}

function App() {
  const [country, setCountry] = useState([])
  
  const [filter, setFilter] = useState("")

  const saaTiedot = () => {
    Axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountry(response.data)
      console.log(response.data)
    })
  }
  
  useEffect(saaTiedot, [])

  const filterHandler = (event) => {
    setFilter(event.target.value)
  }
  
  const re = country.filter(item => item.name.toLowerCase().startsWith(filter))

  const read = () => {
    const result = re.map(item => <p key = {item.name}>
      {item.name}
    </p>)
    return result
  }
  
  const isFilter = filter.length > 0 ? true : false

  const showCountries = () => {
    if(isFilter){
      if(re.length === 1){
        return <div>
          <h2>{re[0].name}</h2><br/>
          Capital {re[0].capital}<br/>
          Population {re[0].population}
          <h2>Languages</h2>
          <ul>
          {re[0].languages.map(language => <li>{language.name}</li>)}
          </ul>
          <br/>
          <img src = {re[0].flag} style = {{width: 100}}/><br/>
        </div>
      }
      else if(re.length < 10){
        return <div>
          {read()}
        </div>   
      }
      else {
      return <p>Too many matches, specify another filter</p>
      }
    }
  }
  
  return (
    <div>
      find countries: <input
        onChange = {filterHandler}
      />
      <Tiedot 
        read = {showCountries()}
      />
    </div>
  );
}

export default App;
