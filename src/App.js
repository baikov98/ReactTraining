import React, { useEffect, useState } from 'react'

const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = 'http://api.football-data.org/v2/competitions'
const getJson = async () => {
  /* const response = fetch(proxyurl+url)
                    .then(response => response.json())
  const res = JSON.stringify(response, null, ' ')
  return res */
  let resp = await fetch(proxyurl+url)
  let text = await resp.json()
  console.log(JSON.stringify(text))
  return text
}

function App() {
  const [val, setVal] = useState('')
  
  const handleClick = () => {
    setVal(getJson())
  }
  return (
    <div>
      <input></input>
      <button onClick={handleClick}>Найти</button>
      <div>{JSON.stringify(val, null, ' ')}</div>
    </div>
  );
}

export default App;
