import React, { useEffect, useState } from 'react'
import {
  Link,
  useParams,
} from "react-router-dom";

function ActiveCompetition(props) {
    return (
        <tr>
        <td>{props.region}</td>
        <td>{props.league}</td>
        <td>{props.plan}</td>
        <td>{new Date(props.date).toLocaleDateString()}</td>
      </tr>
    )
}


export default function Team(props) {
    const { id } = useParams()
    const [ val, setVal ] = useState(null)
    const teamurl = `http://api.football-data.org/v2/teams/${id}?dateFrom=2019-01-01&dateTo=2021-01-01`
    
   
    useEffect(() => {
        fetch(teamurl, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setVal(json))
    }, [])
    if (!val) {return <div>Loading ...</div>}
    console.log(val)
    return (
        <div>
        <h2>{val.name} ({val.area.name})</h2>
        <h4>Active Competitions</h4>
        <table>
        <thead>
        <tr>
          <th>Region</th>
          <th>League</th>
          <th>Plan</th>
          <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {val.activeCompetitions.map((i, index ) => (
            <ActiveCompetition  key={index} 
                                region={i.area.name}
                                league={i.name}
                                plan={i.plan}
                                date={i.lastUpdated}
                       />
                       ))} 
        </tbody>
      </table>
      </div>
    )
}