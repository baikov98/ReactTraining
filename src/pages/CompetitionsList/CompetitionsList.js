import { useEffect, useState, useContext } from 'react'
import {
  Link,
  useParams,
  useLocation,
  useHistory
} from "react-router-dom"; 
import Context from '../../context'
import SearchInput from '../../components/SearchInput/SearchInput'
import CompetitionsTable from './CompetitionsTable'
import YearSelect from '../../components/YearSelect/YearSelect'


const url = 'http://api.football-data.org/v2/competitions'
const availableIDs = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]

  
export default function CompetitionsList(props) {
    const { setQuery, deleteQuery } = useContext(Context)
    const history = useHistory()
    const loc = new URLSearchParams(window.location.search)
    const query = loc.get('query') || '';
    const yearArray = [2020, 2019, 2018, 2017]
    const [data, setData] = useState(null)
    const [year, setYear] = useState(loc.get('year') || yearArray[0])
    const yearSwitcher = (year) => {
      setYear(year);
      console.log('SWITCH', year)
    }
    useEffect(() => {console.log('useEF for window.loc')}, [window.location.search])
    useEffect(() => {
      console.log('useEF for FETCH')
      fetch(url, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setData(json))
    }, [])
    
    if (!data) { return <div>Loading...</div>}

    const leagueArr = data.competitions.filter((val) => {
                      return availableIDs.includes(val.id)
                      })
    
    console.log(data)
    return (
      <>
      <button onClick={() => setQuery(history, 'rer', 'lodp')}>asd</button>
      <button onClick={() => deleteQuery(history, 'rer')}>asd</button>
      <SearchInput />
      <YearSelect yearSwitcher={yearSwitcher} yearArray={yearArray} />
      <CompetitionsTable leagueArr={leagueArr} query={query} year={year} />
      </>
    )
  }