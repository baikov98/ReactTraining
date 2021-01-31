import React, { useEffect, useState } from 'react'

const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = 'http://api.football-data.org/v2/competitions'
const teams = 'http://api.football-data.org/v2/competitions/2003/standings'

function getTeams() {
  fetch(teams, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
        .then(response => response.json())
        .then(json => console.log(json))
}

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
  //console.log(props.response.competitions[1])

  const leagues = props.response.competitions
  const availableIDs = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]
  const leagueArr = leagues.filter((val) => {
    return availableIDs.includes(val.id)
  })
  console.log(leagueArr)
  return (
    <table>
      <thead>
      <tr>
        <th>Region</th>
        <th>Country Code</th>
        <th>League</th>
        <th>League1</th>
        </tr>
      </thead>
      <tbody>
        {leagueArr.map((val, i) => (
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
