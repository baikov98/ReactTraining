import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const teams = 'http://api.football-data.org/v2/competitions/2021/teams'

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
  
 export function TeamList(props) {
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