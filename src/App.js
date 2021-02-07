
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
import TeamList from './pages/TeamList/TeamList'
import { LeagueCal } from './pages/LeagueCal/LeagueCal'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Team from './pages/Team/Team'

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
