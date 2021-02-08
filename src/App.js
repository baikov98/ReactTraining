
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import CompetitionsList from './pages/CompetitionsList/CompetitionsList'
import TeamList from './pages/TeamList/TeamList'
import { LeagueCal } from './pages/LeagueCal/LeagueCal'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Team from './pages/Team/Team'

function App() {

  return (
    <Router>
    <h1>Top soccer tournaments statistics</h1>
    <h3><Link to='/'>Главная</Link></h3>
      <Switch>
        <Route path="/:id/teams" exact component={TeamList} />
          
        <Route path="/:id/calendar" exact component={LeagueCal} />

        <Route path="/teams/:id" exact component={Team} />
          
        <Route path="/" exact component={CompetitionsList} />

        <Route component={PageNotFound} />

      </Switch>
    </Router>
  );
}

export default App;

