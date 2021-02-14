import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";

import SearchInput from '../../components/SearchInput/SearchInput'
import YearSelect from '../../components/YearSelect/YearSelect'
import TeamListTable from './TeamListTable'
import Loader from '../../components/Loader/Loader'
import ShowError from '../../components/ShowError/ShowError'
import useFetchData from '../../hooks/useFetchData'

const yearArray = [2020, 2019, 2018]

const TeamListPage = (props) => {
    const loc = new URLSearchParams(window.location.search)
    const yearParam = loc.get('year') || yearArray[0]; //getting year from url
    let { id } = useParams()
    
    const [queryString, setQueryString] = useState(loc.get('query') || '')
    const [data, setData] = useState(null)
    const [year, setYear] = useState(yearParam) // year state
    const yearSwitcher = (year) => setYear(year)
    
    const teams = `https://api.football-data.org/v2/competitions/${id}/teams?season=${year}`

    useFetchData(teams, [year], setData)
    
    if (!data) { return <Loader />}

    if (!data.competition) { return <ShowError error={data} /> }

    return (
      <>
      <h2>{data.competition.name} ({data.competition.area.name})</h2>
      <ul>
        <li><strong>Season dates:</strong> {data.season.startDate} - {data.season.endDate}</li>
        <li><strong>Team count:</strong> {data.count}</li>
        <li><strong>Current Matchday:</strong> {data.season.currentMatchday}</li>
      </ul>
      { data.season.winner ? <h4>Winner: <img src={data.season.winner.crestUrl} 
                                 className='country__icon'/> 
                                 {data.season.winner.name}</h4> : <></> }
      <div className='d-inline-flex'>
        <SearchInput setQueryString={setQueryString} 
                      queryString={queryString} />
        <YearSelect yearSwitcher={yearSwitcher} 
                    yearArray={yearArray}
                    year={year}
                      />
      </div>
      <TeamListTable teamsArr={data.teams} year={+year}/>
      </>
    )
  }

export default TeamListPage