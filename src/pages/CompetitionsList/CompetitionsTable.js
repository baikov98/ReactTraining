import React from 'react'
import { Link } from "react-router-dom"; 
import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'

const availableIDs = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]

function TableItem({ i }) {
    return (<tr>
                <td>{ i.area.ensignUrl ? <img src={i.area.ensignUrl} className='country__icon'/> : null}</td>
                <td>{i.area.name}</td>
                <td>{i.area.countryCode}</td>
                <td>{i.name}</td>
                <td>{availableIDs.includes(i.id) ? 
                                (<Link to={`/${i.id}/teams`}>Teams</Link>) : 'Teams'}</td>
                <td>{availableIDs.includes(i.id) ? 
                                (<Link to={`/${i.id}/calendar`}>Calendar</Link>) : 'Calendar'}</td>
                <td>{i.currentSeason?.startDate || ''}</td>
                <td>{i.currentSeason?.endDate || ''}</td>
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

export default function CompetitionsTable({ leagueArr, query, year }) {
    const FilteredByQuery = leagueArr
                    .filter((val, i) => {
                    if (query === '') return val;
                    if (val.name.toLowerCase().includes(query.toLowerCase())) return val })
    const FilteredByYear = FilteredByQuery
                    .filter((val) => {
                        return new Date(val.currentSeason.startDate).getFullYear() == year
                    })
    const ItemsCompetition = FilteredByYear.map((i, index) => (
        <TableItem key={index} i={i} />
    ))
    return (
        <>
        { ItemsCompetition.length ? (<LeagueTable>
            {ItemsCompetition}
        </LeagueTable>) : <NotFoundForQuery queryArray={[{name: 'search query', 
                                                          desc: query}, 
                                                          {name: 'year',
                                                          desc: year}]} />} 
        </>
    )
}