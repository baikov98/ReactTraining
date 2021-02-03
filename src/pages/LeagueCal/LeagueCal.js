import { func } from 'prop-types';
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";




function LeagueCalItem(props) {
    let date = new Date(props.utcDate)
    return (
        <tr>
        <td>{date.toLocaleString()}</td>
        <td>{props.homeTeam}</td>
        <td>{props.scoreHomeTeam} : {props.scoreAwayTeam}</td>
        <td>{props.awayTeam}</td>
      </tr>
    )
}

export function LeagueCal(props) {


    const [val, setVal] = useState(null)
    let { id } = useParams()
    const matches = `http://api.football-data.org/v2/competitions/${id}/matches`
    useEffect(() => {
        fetch(matches, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setVal(json))
    }, [])

    if (!val) { return <div>Loading....</div>}
    return (
        <Router>
            <div>Calendar list component</div>
            <Route path={`/${id}/calendar`}>
                <table>
                    <thead>
                    <tr>
                    <th>Дата</th>
                    <th>Хозяева</th>
                    <th>Счет</th>
                    <th>Гости</th>
                    </tr>
                    </thead>
                    <tbody>
                        {val.matches.map((i, index ) => (
                            <LeagueCalItem key={index} 
                                           awayTeam={i.awayTeam.name} 
                                           homeTeam={i.homeTeam.name} 
                                           scoreAwayTeam={i.score.fullTime.awayTeam}
                                           scoreHomeTeam={i.score.fullTime.homeTeam} 
                                           utcDate={i.utcDate}/>
                        ))} 
                    </tbody>
                </table> 
            </Route>
  
        </Router>
    )
}