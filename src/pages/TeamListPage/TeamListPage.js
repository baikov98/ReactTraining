import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";

import SearchInput from '../../components/SearchInput/SearchInput'
import YearSelect from '../../components/YearSelect/YearSelect'
import TeamListTable from './TeamListTable'

const yearArray = [2020, 2019, 2018]

const TeamListPage = (props) => {
    const loc = new URLSearchParams(window.location.search)
    const yearParam = loc.get('year') || yearArray[0]; //getting year from url
    let { id } = useParams()
    
    const [queryString, setQueryString] = useState(loc.get('query') || '')
    const [data, setData] = useState(null)
    const [year, setYear] = useState(yearParam) // year state
    const yearSwitcher = (year) => setYear(year)
    
    const teams = `http://api.football-data.org/v2/competitions/${id}/teams?season=${year}`

    useEffect(() => {
      console.log('teamlist year changed')
      fetch(teams, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setData(json))
    }, [year])
    
    if (!data) { return <div>Loading...</div>}
    console.log(data)
    return (
      <>
      <h1>{data.competition.name} ({data.competition.area.name})</h1>
      <h4>Season dates: {data.season.startDate} - {data.season.endDate}</h4>
      <h4>Team count: {data.count}</h4>
      <h4>Current Matchday: {data.season.currentMatchday}</h4>
      { data.season.winner ? <h4>Winner: <img src={data.season.winner.crestUrl} 
                                 className='country__icon'/> 
                                 {data.season.winner.name}</h4> : <></> }
      <SearchInput setQueryString={setQueryString} 
                   queryString={queryString} />
      <YearSelect yearSwitcher={yearSwitcher} 
                  yearArray={yearArray}
                  year={year}
                   />
      <TeamListTable teamsArr={data.teams} year={year}/>
      </>
    )
  }

export default TeamListPage