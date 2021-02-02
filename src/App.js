import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";


const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = 'http://api.football-data.org/v2/competitions'
const teams = 'http://api.football-data.org/v2/competitions/2021/teams'

function getIt() {
  fetch(teams, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
        .then(response => response.json())
        .then(json => console.log(json.teams))
}

function TeamItem(props) {
  return (
    <tr>
      <td>{ props.iconUrl ? <img src={props.iconUrl} className='country__icon'/> : null}</td>
      <td>{props.area}</td>
      <td>{props.teamName}</td>
      <td>{props.website}</td>
    </tr>
  )
}

function TeamList(props) {
  const [val, setVal] = useState(null)

  useEffect(() => {
    fetch(teams, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
        .then(response => response.json())
        .then(json => setVal(json.teams))
  }, [])

  let id = useParams()
  console.log(val)
  
  if (!val) { return <div>Loading...</div>}
  return (
    <Router>
    <div>Team list component</div>
    <Route path={`/${id.id}/teams`}>
    <table>
      <thead>
      <tr>
        <th>icon</th>
        <th>Region</th>
        <th>Team Name</th>
        <th>Website</th>
        </tr>
      </thead>
      <tbody>
        {val.map((i, index ) => (
    <TeamItem key={index} iconUrl={i.crestUrl} area={i.area.name} teamName={i.name} website={i.website}/>
  ))} 
      </tbody>
    </table>
    </Route>

    </Router>
  )
}

function CompetitionItem(props) {

  return (
    <tr>
      <td>{ props.iconUrl ? <img src={props.iconUrl} className='country__icon'/> : null}</td>
      <td>{props.area}</td>
      <td>{props.ccode}</td>
      <td>{props.league}</td>
      <td>{props.teamLink}</td>
    </tr>
  )
} 

function CompetitionsList(props) {
  const leagues = props.response.competitions
  const availableIDs = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]
  const leagueArr = leagues.filter((val) => {
                    return availableIDs.includes(val.id)
  })

  const ItemsCompetition = leagueArr.map((val, i) => (
    
    <CompetitionItem iconUrl={val.area.ensignUrl} 
                     area={val.area.name} 
                     ccode={val.area.countryCode} 
                     league={val.name} 
                     teamLink={<Link to={`/${val.id}/teams`}>Команды</Link>}
                     key={i}/>
                     ))
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
              {ItemsCompetition}
      </tbody>
    </table>
    
  )
}

function App() {
  const [val, setVal] = useState(null)
  useEffect(() => {
    //getIt()
    fetch(url, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
        .then(response => response.json())
        .then(json => setVal(json))
  }, [])

  return (
    <Router>
    <h1>Статистика ведущих турниров по футболу</h1>
    <h3><Link to='/'>Главная</Link></h3>
      <Switch>
        <Route path="/:id">
          <TeamList />
        </Route>

        <Route path="/">
          <div>
                {val ? <div><CompetitionsList response={val} /></div> : <div> Loading...</div>}
          </div>
        </Route>
        
      </Switch>
    </Router>
  );
}


export default App;
