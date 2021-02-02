import { func } from 'prop-types';
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { TeamList } from './pages/TeamList/TeamList'
import { LeagueCal } from './pages/LeagueCal/LeagueCal'
import PageNotFound from './pages/PageNotFound/PageNotFound'

const url = 'http://api.football-data.org/v2/competitions'

const matches = 'http://api.football-data.org/v2/competitions/2021/matches'

function getIt() {
  fetch(matches, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
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
      <td>{props.teamLink}</td>
      <td>{props.calLink}</td>
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
                     teamLink={<Link to={`/${val.id}/teams`}>Teams</Link>}
                     calLink={<Link to={`/${val.id}/calendar`}>Calendar</Link>}
                     key={i}/>
                     ))
  return (
    <table>
      <thead>
        <tr>
          <th>Flag</th>
          <th>Region</th>
          <th>Country<br/>code</th>
          <th>Leagues</th>
          <th>Teams</th>
          <th>Calendar</th>
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
        <Route path="/:id/teams" exact>
          <TeamList />
        </Route>

        <Route path="/:id/calendar" exact>
          <LeagueCal />
        </Route>

        <Route path="/" exact>
          <div>
                {val ? <div><CompetitionsList response={val} /></div> : <div> Loading...</div>}
          </div>
        </Route>
        
        <Route path="/">
          <PageNotFound />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
