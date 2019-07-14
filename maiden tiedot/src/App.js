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
  const [inx, setInx] = useState("")
  
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
    setInx("")
  }
  
  const re = country.filter(item => 
    item.name.toLowerCase().startsWith(filter))

  const read = () => {
    const result = re.map((item, i) => <p key = {item.name}>
      {item.name}
      <button onClick = {showHandler} value = {item.name}>show</button>
    </p>)
    return result
  }

  const isFilter = filter.length > 0 ? true : false

  
  const readData = () => {
    const data = re.map(item => <div key = {item.name}>
      <h2>{item.name}</h2>
      Capital {item.capital}<br/>
      Population {item.population}
      <h2>Languages</h2>
      <ul>
        {item.languages.map(language => <li key = {language.name}>{language.name}</li>)}
      </ul>
      <img src = {item.flag} style = {{width: 100}} alt = "lipp"/><br/>
    </div>
    )
      
    return data
  }

  const readButton = (nimi) => {
  
    const butData = re.map(item => nimi === item.name ? <div key = {item.name}>
      <h2>{item.name}</h2>
      Capital {item.capital}<br/>
      Population {item.population}
      <h2>Languages</h2>
      <ul>
        {item.languages.map(language => <li key = {language.name}>{language.name}</li>)}
      </ul>
      <img src = {item.flag} style = {{width: 100}} alt = "lipp"/><br/>
    </div> : null
    )
    return butData
  }

  const showCountries = () => {
    if(isFilter){
      if(re.length === 1){
        return <div>{readData(inx)}</div>
      }
      else if(re.length < 10){
        return <div>{inx.length > 0 ? readButton(inx) : read()}</div>
      }
      else {
      return <p>Too many matches, specify another filter</p>
      }
    }
  }

  const ret = re.filter(item => item[inx])

  console.log(ret.map(i => i.name))

  let maa = ""

  const showHandler = (event) => {
    maa = event.target.value
    setInx(maa)   
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
