import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name !== '') {
      const promise = axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      promise.then(response => {
        setCountry({country: response.data[0], found: true})
      })
      promise.catch(error => { 
        setCountry({found: false})
        console.log(error.response.data)
      })
    }
  }, [name])

  return country
}

// piti tulla sorkkimaan tätäkin koodia, koska alkuperäisellä en saanut propseja välitettyä
const Country = ({ country }) => {

  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  country = {...country.country}  // setCountry asettaa countryn hassusti sisäkkäin joten pitää kaivaa ulos tällä tapaa

  // täällä muutettiin kaikki tyyliin esim. country.data.name ---> country.name
  return (
    <div>
    <h3>{country.name} </h3>
    <div>capital {country.capital} </div>
    <div>population {country.population}</div>
    <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>
  </div>
  )
} 

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App