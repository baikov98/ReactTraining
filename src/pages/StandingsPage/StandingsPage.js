import React, { useEffect, useState, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from "react-router-dom";

import SearchInput from '../../components/SearchInput/SearchInput'
import StandingsTable from './StandingsTable'
import StandingsType from './StandingsType'
import reducer, { types } from './reducer'
import { PathContext } from '../../PathContext'

const StandingsPage = (props) => {
    const history = useHistory()
    const { setQuery } = useContext(PathContext)
    const loc = new URLSearchParams(window.location.search)
    let { id } = useParams()
    
    const [queryString, setQueryString] = useState(loc.get('query') || '')
    const [data, setData] = useState(null)
    const [type, dispatchType] = useReducer(reducer, types[loc.get('type') || 0])
    
    const changeType = (data) => {
      dispatchType({type: data})
      setQuery(history, 'type', data)
    }

    const teams = `http://api.football-data.org/v2/competitions/${id}/standings`
    useEffect(() => {
      fetch(teams, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setData(json))
    }, [])
    
    if (!data) { return <div>Loading...</div>}
    console.log(data)
    return (
        <>
      <h1>{data.competition.name} ({data.competition.area.name})</h1>
      <h4>Season dates: {data.season.startDate} - {data.season.endDate}</h4>
      <SearchInput setQueryString={setQueryString} 
                   queryString={queryString} />
      <StandingsType types={types} 
                     changeType={changeType}
                     type={type} />
      <StandingsTable standingsArr={data.standings[type.num].table}  />
      </>
    )
  }

  export default StandingsPage