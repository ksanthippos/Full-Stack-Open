import React from 'react'
import {useDispatch} from "react-redux";
import {setSearch, setEmpty} from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.target.value !== ''
      ? dispatch(setSearch(event.target.value))
      : dispatch(setEmpty())
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