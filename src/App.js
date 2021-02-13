import { useEffect, useState, useRef } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { PathProvider } from './PathContext'
import CompetitionsList from './pages/CompetitionsPage/CompetitionsPage'
import TeamListPage from './pages/TeamListPage/TeamListPage'
import StandingsPage from './pages/StandingsPage/StandingsPage'
import LeaguePage from './pages/LeaguePage/LeaguePage'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import TeamPage from './pages/TeamPage/TeamPage'

function App() {
  
  return (
    <PathProvider>
      <Router>
        <h1>Top soccer tournaments statistics</h1>
        <h3><Link to='/'>Главная</Link></h3>
        <Switch>
          <Route path="/:id/teams" exact component={TeamListPage} />
            
          <Route path="/:id/calendar" exact component={LeaguePage} />

          <Route path="/:id/standings" exact component={StandingsPage} />

          <Route path="/teams/:id" exact component={TeamPage} />
            
          <Route path="/" exact component={CompetitionsList} />
            
          <Route component={PageNotFound} />

        </Switch>
      </Router>
    </PathProvider>
  );
}

export default App;

