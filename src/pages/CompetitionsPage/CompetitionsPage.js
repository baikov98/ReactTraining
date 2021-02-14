import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"; 
import SearchInput from '../../components/SearchInput/SearchInput'
import CompetitionsTable from './CompetitionsTable'
import YearSelect from '../../components/YearSelect/YearSelect'
import Loader from '../../components/Loader/Loader'
import ShowError from '../../components/ShowError/ShowError'
import useFetchData from '../../hooks/useFetchData'

const url = 'https://api.football-data.org/v2/competitions'
const availableIDs = [2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]
const yearArray = [2020, 2019, 2018, 2017]

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