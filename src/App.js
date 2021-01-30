import React, { useEffect, useState } from 'react'

const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = 'http://api.football-data.org/v2/competitions'
const getJson = () => {
  const response = fetch(proxyurl+url)
                    .then(response => response.text())
                    //.then(json => JSON.stringify(json))
  //const res = JSON.stringify(response, null, ' ')
  return response
  
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
      <pre>{val}</pre>
    </div>
  );
}

export default App;
