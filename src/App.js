import React, { useEffect, useState } from 'react'

const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = 'http://api.football-data.org/v2/competitions'

function CompetitionItem(props) {

  return (
    <tr>
      <td>{props.area}</td>
      <td>{props.ccode}</td>
      <td>{props.league}</td>
    </tr>
  )
} 

function CompetitionsList(props) {
  console.log(props.response.competitions[1])
  const leagues = props.response.competitions
  return (
    <table>
      <thead>
      <tr>
        <td>Area</td>
        <td>Country Code</td>
        <td>League</td>
        </tr>
      </thead>
      <tbody>
        {leagues.map((val, i) => (
          <CompetitionItem area={val.area.name} ccode={val.area.countryCode} league={val.name} key={i}/>
        ))}
      </tbody>
    </table>
  )
}



function App() {
  const [val, setVal] = useState(null)
  
  const handleClick = () => {
    fetch(url, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
        .then(response => response.json())
        .then(json => setVal(json))
  }
    
  
  return (
    <div>
      <input></input>
      <button onClick={handleClick}>Найти</button>
      {val ? <div><CompetitionsList response={val} /></div> : <div> Loading...</div>}
      
    </div>
  );
}


export default App;
