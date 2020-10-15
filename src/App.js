import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note.js'
import axios from 'axios'

const App = () => {

  const [ content, setContent ] = useState([])
  const [ query, setQuery ] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/api/words')
    .then(r => setContent(r.data))
    console.log('global rerender')
  }, [])
  

  const inputChange = (ev) => {
    setQuery(ev.target.value)
    console.log('query', query)
  }

  const inputPost = (ev) => {
    ev.preventDefault()

    const newObject = {
      de: query
    }
    
    axios
    .post('http://localhost:3001/api/words', newObject)
    .then(r => {
      setContent(content.concat(r.data))
      console.log('query before call', query)    
    })

    setQuery('')
    
  }

  const clearEntry = (ev) => {
    const id = ev.target.id

    axios
    .delete(`http://localhost:3001/api/words/${id}`)
    .then(() => axios.get('http://localhost:3001/api/words').then(r => setContent(r.data)))
  }

  return (
    <div>
      <form>
        <input value={query} onChange={inputChange} />
        <button onClick={inputPost} type='submit'>Submit</button>
      </form>
      <ol>
        {content.map(i => <Note key={i.id} content={i} clearEntry={clearEntry}/>)}
      </ol>
    </div>
  )
}

export default App;
