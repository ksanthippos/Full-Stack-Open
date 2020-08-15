import React from 'react'
import {setSearch, setEmpty} from "../reducers/filterReducer";

const Filter = () => {

  const handleChange = (event) => {
    event.target.value === '' ?
      setEmpty() :
      setSearch(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
  )
}

export default Filter