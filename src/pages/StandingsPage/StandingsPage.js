import React, { useEffect, useState, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from "react-router-dom";

import SearchInput from '../../components/SearchInput/SearchInput'
import StandingsTable from './StandingsTable'
import StandingsType from './StandingsType'
import reducer, { types } from './reducer'
import { PathContext } from '../../PathContext'
import Loader from '../../components/Loader/Loader'
import ShowError from '../../components/ShowError/ShowError'
import useFetchData from '../../hooks/useFetchData'

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

    const standings = `http://api.football-data.org/v2/competitions/${id}/standings`
   
    useFetchData(standings, [], setData)
    if (!data) { return <Loader />}
    if (!data.competition) { return <ShowError error={data} /> }
    console.log(data)
    return (
        <>
      <h1>{data.competition.name} ({data.competition.area.name})</h1>
      <h4>Season dates: {data.season.startDate} - {data.season.endDate}</h4>
      <div className='d-flex'>
        <SearchInput setQueryString={setQueryString} 
                    queryString={queryString} />
        <StandingsType types={types} 
                      changeType={changeType}
                      type={type} />
      </div>
      <StandingsTable standingsArr={data.standings[type.num].table}  />
      </>
    )
  }

  export default StandingsPage