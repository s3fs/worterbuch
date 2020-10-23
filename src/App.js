import React, { useState, useEffect } from 'react'
import './App.css'

import Note from './components/Note.js'
import Screen from './components/Screen.js'
import axios from 'axios'

const App = () => {

  const [ content, setContent ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ screenState, setScreenState ] = useState(true)

  useEffect(() => {
    axios
    .get('http://localhost:3001/api/words')
    .then(r => {
      setContent(r.data)
      setScreenState(false)
    })
    console.log('global rerender')
  }, [])
  

  const inputChange = (ev) => {
    setQuery(ev.target.value)
    console.log('query', query)
  }

  const inputPost = (ev) => {
    ev.preventDefault()
    setScreenState(true)

    const newObject = {
      de: query
    }
    
    axios
    .post('http://localhost:3001/api/words', newObject)
    .then(r => {
      setContent(content.concat(r.data))
      setScreenState(false)   
    })

    setQuery('')
    
  }

  const clearEntry = (ev) => {
    setScreenState(true)
    const id = ev.target.id

    axios
    .delete(`http://localhost:3001/api/words/${id}`)
    .then(() => axios.get('http://localhost:3001/api/words').then(r => setContent(r.data)).then(setScreenState(false)))
  }

  return (
    <div>
      <Screen screenState={screenState} />
      <div className='container'>
        <form>
          <input value={query} onChange={inputChange} />
          <button onClick={inputPost} className='input_button'>Post</button>
        </form>
        <ul>
          {content.map(i => <Note key={i.id} content={i} clearEntry={clearEntry}/>)}
        </ul>
      </div>
    </div>
  )
}

export default App;
