
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Context from './context' 

import CompetitionsList from './pages/CompetitionsList/CompetitionsList'
import TeamList from './pages/TeamList/TeamList'
import { LeagueCal } from './pages/LeagueCal/LeagueCal'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Team from './pages/Team/Team'

function App() {
  const history = useHistory()
  const location = new URLSearchParams(window.location.search)
  console.log(location)
  const [searchQuery, setSearchQuery] = useState(location.get('query'))
  useEffect(() => {
    console.log('refresh')
  }, [window.location.search])
  const setQuery = (history, name, data) => {
    const loc = new URLSearchParams(window.location.search)
    if (!loc.has(name)) loc.append(name, data);
    else loc.set(history, name, data);
    history.push({search: loc.toString()})
  }
  const deleteQuery = (history, name) => {
    const loc = new URLSearchParams(window.location.search)
    loc.delete(name)
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
        <Route path="/:id/teams" exact component={TeamList} />
          
        <Route path="/:id/calendar" exact component={LeagueCal} />

        <Route path="/teams/:id" exact component={Team} />
          
        <Route path="/" exact component={CompetitionsList} />

        <Route component={PageNotFound} />

      </Switch>
    </Router>
    </Context.Provider>
  );
}

export default App;

