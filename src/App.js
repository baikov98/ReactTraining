import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Context from './context' 

import CompetitionsList from './pages/CompetitionsPage/CompetitionsPage'
import TeamListPage from './pages/TeamListPage/TeamListPage'
import LeaguePage from './pages/LeaguePage/LeaguePage'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import TeamPage from './pages/TeamPage/TeamPage'

function App() {

  const setQuery = (history, name, data) => {
    const loc = new URLSearchParams(window.location.search)
    if (!loc.has(name)) loc.append(name, data);
    else if (!data) loc.delete(name)
    else loc.set(name, data);
    history.push({search: loc.toString()})
  }
  const deleteQuery = (history, queryArray) => {
    const loc = new URLSearchParams(window.location.search)
    for (let query of queryArray) loc.delete(query)
    history.push({search: loc.toString()})
  }

  return (
    <Context.Provider value={
      {setQuery, deleteQuery}
    }>
    <Router>
    <h1>Top soccer tournaments statistics</h1>
    <h3><Link to='/'>Главная</Link></h3>
      <Switch>
        <Route path="/:id/teams" exact component={TeamListPage} />
          
        <Route path="/:id/calendar" exact component={LeaguePage} />

        <Route path="/teams/:id" exact component={TeamPage} />
          
        <Route path="/" exact component={CompetitionsList} />
          
        <Route component={PageNotFound} />

      </Switch>
    </Router>
    </Context.Provider>
  );
}

export default App;

