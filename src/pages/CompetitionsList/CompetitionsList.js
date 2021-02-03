import React, { useEffect, useState,  } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation
} from "react-router-dom"; 
import SearchInput, { getQuery } from '../../components/SearchInput/SearchInput'

const matches = 'http://api.football-data.org/v2/competitions/2021/matches'
const url = 'http://api.football-data.org/v2/competitions'
const availableIDs = [2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]

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
        <td>{props.startDate}</td>
        <td>{props.endDate}</td>
      </tr>
    )
} 
  
export default function CompetitionsList(props) {

    const [data, setData] = useState(null)
    let location = useLocation()
    useEffect(() => {}, [location.search])
    useEffect(() => {
      console.log('competitions')
      //getIt()
      fetch(url, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setData(json.competitions))
    }, [])
    

    if (!data) { return <div>Loading...</div>}

    const leagueArr = data.filter((val) => {
                      return availableIDs.includes(val.id)
                      })
    
    const query = getQuery()
    const ItemsCompetition = leagueArr
                    .filter((val, i) => {
                    if (query === '') return val;
                    if (val.name.toLowerCase().includes(query.toLowerCase())) return val })
                    .map((val, i) => ( 
                        <CompetitionItem iconUrl={val.area.ensignUrl} 
                                         area={val.area.name} 
                                         ccode={val.area.countryCode} 
                                         league={val.name} 
                                         teamLink={<Link to={`/${val.id}/teams`}>Teams</Link>}
                                         calLink={<Link to={`/${val.id}/calendar`}>Calendar</Link>}
                                         startDate={val.currentSeason.startDate}
                                         endDate={val.currentSeason.endDate}
                                         key={i}/>
                                        ))
 
    return (
      <>
      <SearchInput />
      <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Region</th>
            <th>Country<br/>code</th>
            <th>Leagues</th>
            <th>Teams</th>
            <th>Calendar</th>
            <th>Start<br/>Date</th>
            <th>End<br/>Date</th>
          </tr>
        </thead>
        <tbody>
                {ItemsCompetition}
        </tbody>
      </table>
      </>
    )
  }