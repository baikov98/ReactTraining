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
 
function getQuery() {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  return params.get('query') || '';
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
  
export default function CompetitionsList(props) {
    
    const query = getQuery()
    const [search, setSearch] = useState(query)
    
    let history = useHistory()
    const leagues = props.response.competitions
    const availableIDs = [2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]
    const leagueArr = leagues.filter((val) => {
                      return availableIDs.includes(val.id)
                      })
    const inputHandle = (e) => {
      if (e.target.value) history.push(`/?query=${e.target.value}`)
      else history.push('')
      setSearch(e.target.value)
    }
    const ItemsCompetition = leagueArr
                    .filter((val, i) => {
                    if (search === '') return val;
                    if (val.name.toLowerCase().includes(search.toLowerCase())) return val })
                    .map((val, i) => (
                        <CompetitionItem iconUrl={val.area.ensignUrl} 
                                         area={val.area.name} 
                                         ccode={val.area.countryCode} 
                                         league={val.name} 
                                         teamLink={<Link to={`/${val.id}/teams`}>Teams</Link>}
                                         calLink={<Link to={`/${val.id}/calendar`}>Calendar</Link>}
                                         key={i}/>
                                        ))
    
    return (
      <>
      <input type="text" onChange={inputHandle} value={search}/>
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
      </>
    )
  }