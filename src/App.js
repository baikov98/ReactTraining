import React, { useEffect, useState } from 'react'

const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = 'http://api.football-data.org/v2/competitions/'

const getJson = () => {

  fetch(url, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
        .then(response => response.json())
        .then(json => console.log(json))


}

function CompetitionList(props) {
  return (
    <div>{props.response.toString()}</div>
  )
  
}

function App() {
  const [val, setVal] = useState(null)
  
  const handleClick = () => {
    fetch(url, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
        .then(response => response.json())
        .then(json => setVal(json.count))
  }
    
  
  return (
    <div>
      <input></input>
      <button onClick={handleClick}>Найти</button>
      {val ? <div><CompetitionList response={val} /></div> : <div> Loading...</div>}
      
    </div>
  );
}


export default App;
