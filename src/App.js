import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Context from './context' 

import CompetitionsList from './pages/CompetitionsList/CompetitionsList'
import TeamList from './pages/TeamList/TeamList'
import LeagueCal from './pages/LeagueCal/LeagueCal'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Team from './pages/Team/Team'

function App() {
  const [searchQuery, setSearchQuery] = useState(window.location.search)

  useEffect(() => {
    setSearchQuery(window.location.search)
    console.log('MAIN STATE VAL', searchQuery)
  }, [window.location.search])

  const setQuery = (history, name, data) => {
    const loc = new URLSearchParams(window.location.search)
    if (!loc.has(name)) loc.append(name, data);
    else if (!data) loc.delete(name)
    else loc.set(name, data);
    console.log(loc.toString())
    setSearchQuery(loc.toString())
    history.push({search: loc.toString()})
  }
  const deleteQuery = (history, queryArray) => {
    const loc = new URLSearchParams(window.location.search)
    for (let query of queryArray) loc.delete(query)
    history.push({search: loc.toString()})
  }
  const getQuery = () => searchQuery;

  return (
    <Context.Provider value={
      {setQuery, deleteQuery, getQuery}
    }>
    <Router>
    <h1>Top soccer tournaments statistics</h1>
    <h3><Link to='/'>Главная</Link></h3>
      <Switch>
        <Route path="/:id/teams" exact component={TeamList} />
          
        <Route path="/:id/calendar" exact component={LeagueCal} />

        <Route path="/teams/:id" exact component={Team} />
          
        <Route path="/" exact >
          <CompetitionsList />
        </Route>

        <Route component={PageNotFound} />

      </Switch>
    </Router>
    </Context.Provider>
  );
}

export default App;

