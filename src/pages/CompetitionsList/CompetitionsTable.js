import React from 'react'
import { Link } from "react-router-dom"; 

function TableItem({ i }) {
    return (<tr>
                <td>{ i.area.ensignUrl ? <img src={i.area.ensignUrl} className='country__icon'/> : null}</td>
                <td>{i.area.name}</td>
                <td>{i.area.countryCode}</td>
                <td>{i.name}</td>
                <td>{<Link to={`/${i.id}/teams`}>Teams</Link>}</td>
                <td>{<Link to={`/${i.id}/calendar`}>Calendar</Link>}</td>
                <td>{i.currentSeason.startDate}</td>
                <td>{i.currentSeason.endDate}</td>
            </tr>)
}

function LeagueTable({ children }) {
    return (
        <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Region</th>
            <th>Country<br/>code</th>
            <th>League</th>
            <th>Teams</th>
            <th>Calendar</th>
            <th>Start<br/>Date</th>
            <th>End<br/>Date</th>
          </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
      </table>
    )
}

export default function CompetitionsTable({ leagueArr, query }) {
    const FilteredByQuery = leagueArr
                    .filter((val, i) => {
                    if (query === '') return val;
                    if (val.name.toLowerCase().includes(query.toLowerCase())) return val })
    const ItemsCompetition = FilteredByQuery.map((i, index) => (
        <TableItem key={index} i={i} />
    ))
    return (
        <LeagueTable>
            {ItemsCompetition}
        </LeagueTable>
    )
}