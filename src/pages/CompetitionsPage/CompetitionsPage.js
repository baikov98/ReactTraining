import { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"; 
import Context from '../../context'
import SearchInput from '../../components/SearchInput/SearchInput'
import CompetitionsTable from './CompetitionsTable'
import YearSelect from '../../components/YearSelect/YearSelect'

const url = 'http://api.football-data.org/v2/competitions'
const availableIDs = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]
const yearArray = [2020, 2019, 2018, 2017]
const matches = 'http://api.football-data.org/v2/players/9002'
const getIt = () => {
  fetch(matches, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
      .then(response => response.json())
      .then(json => console.log(json, 2018))
}

function CompetitionsPage(props) {
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
    useEffect(() => {
      getIt()
      fetch(url, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setData(json))
    }, [])
    
    if (!data) { return <div>Loading...</div>}

    const leagueArr = data.competitions.filter((val) => availableIDs.includes(val.id))

    return (
      <>
      <SearchInput setQueryString={setQueryString}
                   queryString={queryString} />
      <YearSelect yearSwitcher={yearSwitcher}
                  yearArray={yearArray} 
                  year={year} />
      <CompetitionsTable leagueArr={leagueArr}
                         query={queryString}
                         year={year} />
      </>
    )
  }

export default CompetitionsPage