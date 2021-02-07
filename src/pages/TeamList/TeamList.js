import React, { useEffect, useState } from 'react'
import {
  Link,
  useParams,
  useLocation,
  useHistory
} from "react-router-dom";

import Team from '../Team/Team'
import SearchInput from '../../components/SearchInput/SearchInput'
import YearSelect from '../../components/YearSelect/YearSelect'


function TeamItem(props) {
    return (
      <tr>
        <td>{ props.iconUrl ? <img src={props.iconUrl} className='country__icon'/> : null}</td>
        <td>{props.area}</td>
        <td><Link to={`/teams/${props.teamid}`}>{props.teamName}</Link></td>
        <td>{props.website}</td>
      </tr>
    )
  }
  
 export default function TeamList(props) {

    const query = new URLSearchParams(window.location.search).get('query') || '';
    const yearParam = new URLSearchParams(window.location.search).get('year') || ''; //getting year from url
    let { id } = useParams()
    const [val, setVal] = useState(null)
    const [year, setYear] = useState(yearParam) // year state
    const yearSwitcher = (year) => setYear(year)
    const teams = `http://api.football-data.org/v2/competitions/${id}/teams?season=${year}`

    useEffect(() => {
      console.log('teamlist year changed')
      fetch(teams, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setVal(json))
    }, [year])
    useEffect(() => {}, [window.location.search])

    if (!val) { return <div>Loading...</div>}

    console.log(val)
    const teamListArr = val.teams.filter((val, i) => {
                            if (query === '') return val;
                            if (val.name.toLowerCase().includes(query.toLowerCase())) return val })
    
    return (
        <>
      <h1>{val.competition.name} ({val.competition.area.name})</h1>
      <h4>Season dates: {val.season.startDate} - {val.season.endDate}</h4>
      <h4>Team count: {val.count}</h4>
      { val.season.winner ? 
            <h4>Winner: <img src={val.season.winner.crestUrl} 
                                 className='country__icon'/> 
                                 {val.season.winner.name}</h4> : 
            <></> }
      <SearchInput />
      <YearSelect yearSwitcher={yearSwitcher} />
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
          {teamListArr.map((i, index ) => (
            <TeamItem  key={index} 
                       iconUrl={i.crestUrl} 
                       area={i.area.name} 
                       teamName={i.name} 
                       website={i.website}
                       calendar={`/${id.id}/teams/`}
                       teamid={i.id}
                       leagueid={id.id}
                       />
                       ))} 
        </tbody>
      </table>
      </>
    )
  }