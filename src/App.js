import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";


const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = 'http://api.football-data.org/v2/competitions'
const teams = 'http://api.football-data.org/v2/competitions/2003/teams'

function getTeams() {
  fetch(teams, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
        .then(response => response.json())
        .then(json => console.log(json))
}

function CompetitionItem(props) {

  return (
    <tr>
      <td>{ props.iconUrl ? <img src={props.iconUrl} className='country__icon'/> : null}</td>
      <td>{props.area}</td>
      <td>{props.ccode}</td>
      <td>{props.league}</td>
    </tr>
  )
} 

function CompetitionsList(props) {
  //const { id } = useParams()
  //console.log(id)
  const leagues = props.response.competitions
  const availableIDs = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]
  const leagueArr = leagues.filter((val) => {
                    return availableIDs.includes(val.id)
  })
  return (
    <table>
      <thead>
      <tr>
        <th>icon</th>
        <th>Region</th>
        <th>Country Code</th>
        <th>League</th>
        <th>Teams</th>
        </tr>
      </thead>
      <tbody>
        {leagueArr.map((val, i) => (
          <CompetitionItem iconUrl={val.area.ensignUrl} 
                           area={val.area.name} 
                           ccode={val.area.countryCode} 
                           league={val.name} 
                           key={i}/>
        ))}
      </tbody>
    </table>
  )
}



function App() {
  const [val, setVal] = useState(null)
  

  useEffect(() => {
    console.log('fetch')
    fetch(url, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
        .then(response => response.json())
        .then(json => setVal(json))
  }, [])

  
  return (

    <div>
      <h1>Статистика ведущих турниров по футболу</h1>
      {val ? <div><CompetitionsList response={val} /></div> : <div> Loading...</div>}
    </div>

  );
}


export default App;
