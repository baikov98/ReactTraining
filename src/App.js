
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import CompetitionsList from './pages/CompetitionsList/CompetitionsList'
import { TeamList } from './pages/TeamList/TeamList'
import { LeagueCal } from './pages/LeagueCal/LeagueCal'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Team from './pages/Team/Team'

const url = 'http://api.football-data.org/v2/competitions'

const matches = 'http://api.football-data.org/v2/competitions/2021/matches'

function getIt() {
  fetch(matches, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
        .then(response => response.json())
        .then(json => console.log(json))
}


function App() {

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

        <Route path="/teams/:id" exact>
          <Team />
        </Route> 

        <Route path="/" exact>
          <div>
                <CompetitionsList />
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
