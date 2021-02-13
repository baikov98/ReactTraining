import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import SearchInput from '../../components/SearchInput/SearchInput'
import YearSelect from '../../components/YearSelect/YearSelect'
import TeamListTable from './TeamListTable'

const yearArray = [2020, 2019, 2018]

export default function TeamListPage(props) {
    const loc = new URLSearchParams(window.location.search)
    const yearParam = loc.get('year') || yearArray[0]; //getting year from url
    let { id } = useParams()
    
    const [queryString, setQueryString] = useState(loc.get('query') || '')
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
    
    if (!val) { return <div>Loading...</div>}
    console.log(val)
    return (
        <>
      <h1>{val.competition.name} ({val.competition.area.name})</h1>
      <h4>Season dates: {val.season.startDate} - {val.season.endDate}</h4>
      <h4>Team count: {val.count}</h4>
      <h4>Current Matchday: {val.season.currentMatchday}</h4>
      { val.season.winner ? <h4>Winner: <img src={val.season.winner.crestUrl} 
                                 className='country__icon'/> 
                                 {val.season.winner.name}</h4> : <></> }
      <SearchInput setQueryString={setQueryString} 
                   queryString={queryString} />
      <YearSelect yearSwitcher={yearSwitcher} 
                  yearArray={yearArray}
                  year={year}
                   />
      <TeamListTable teamsArr={val.teams} year={year}/>
      </>
    )
  }