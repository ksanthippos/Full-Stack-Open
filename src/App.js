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
        setCountry(response)
      })
      promise.catch(error => { console.log(error.response.data) })
    }
  }, [name])

  console.log('useCountry hook 1: ', country) // correct data
  if (country !== null) {
    console.log('useCountry hook 2: ', country.found) // undefined
    console.log('useCountry hook 3: ', country.data) // correct data
  }

  return country
}

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

  return (
      <div>
        <h3>{country.data.name} </h3>
        <div>capital {country.data.capital} </div>
        <div>population {country.data.population}</div>
        <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>
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