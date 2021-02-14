import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom"; 
import Context from '../../context'
import SearchInput from '../../components/SearchInput/SearchInput'
import CompetitionsTable from './CompetitionsTable'
import YearSelect from '../../components/YearSelect/YearSelect'
import Loader from '../../components/Loader/Loader'
import ShowError from '../../components/ShowError/ShowError'
import useFetchData from '../../hooks/useFetchData'

const url = 'http://api.football-data.org/v2/competitions'
const availableIDs = [2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]
const yearArray = [2020, 2019, 2018, 2017]
const matches = 'http://api.football-data.org/v2/players/9002/matches'
const getIt = () => {
  fetch(matches, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
      .then(response => response.json())
      .then(json => console.log(json, 2018))
}

const CompetitionsPage = (props) => {
    const location = useLocation()
    const loc = new URLSearchParams(window.location.search)
    
    const [queryString, setQueryString] = useState(loc.get('query') || '')
    const [data, setData] = useState(null)
    const [year, setYear] = useState(loc.get('year') || yearArray[0])
    const yearSwitcher = (year) => setYear(year)
    
    useEffect(() => {
      if (location.search === '') {
        yearSwitcher(yearArray[0])
        setQueryString('')
      }
    }, [location.search])

    useFetchData(url, [], setData)
    
    if (!data) { return <Loader />}
    if (!data.competitions) { return <ShowError error={data} /> }
    const leagueArr = data.competitions.filter((val) => availableIDs.includes(val.id))
    return (
      <>
      <div className='d-flex mb-3 mt-3'>
        <SearchInput setQueryString={setQueryString}
                    queryString={queryString} />
        <YearSelect yearSwitcher={yearSwitcher}
                    yearArray={yearArray} 
                    year={+year} />
      </div>
      <CompetitionsTable leagueArr={leagueArr}
                         query={queryString}
                         year={+year} />
      </>
    )
  }

export default CompetitionsPage