import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import SearchInput from '../../components/SearchInput/SearchInput'
import YearSelect from '../../components/YearSelect/YearSelect'
import TeamListTable from './TeamListTable'

export default function TeamList(props) {
    const yearArray = [2020, 2019, 2018]
    const yearParam = new URLSearchParams(window.location.search).get('year') || yearArray[0]; //getting year from url
    console.log(yearParam)
    let { id } = useParams()
    const [val, setVal] = useState(null)
    const [year, setYear] = useState(yearParam) // year state
    const yearSwitcher = (year) => setYear(year)
    
    const teams = `http://api.football-data.org/v2/competitions/${id}/teams?season=${year}`
    console.log(teams)
    useEffect(() => {
      console.log('teamlist year changed')
      fetch(teams, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setVal(json))
    }, [year])
    useEffect(() => {}, [window.location.search])
    console.log(val)
    if (!val) { return <div>Loading...</div>}
    return (
        <>
      <h1>{val.competition.name} ({val.competition.area.name})</h1>
      <h4>Season dates: {val.season.startDate} - {val.season.endDate}</h4>
      <h4>Team count: {val.count}</h4>
      { val.season.winner ? <h4>Winner: <img src={val.season.winner.crestUrl} 
                                 className='country__icon'/> 
                                 {val.season.winner.name}</h4> : <></> }
      <SearchInput />
      <YearSelect yearSwitcher={yearSwitcher} 
                  yearArray={yearArray}
                   />
      <TeamListTable teamsArr={val.teams} year={year} />
      </>
    )
  }