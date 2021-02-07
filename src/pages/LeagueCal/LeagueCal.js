
import React, { useEffect, useState, useRef } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
  useHistory
} from "react-router-dom";
import YearSelect from '../../components/YearSelect/YearSelect'
import DateFilter, { getCorrectDateFrom, getCorrectDateTo } from '../../components/DateFilter/DateFilter'
import LeagueCalItems from './LeagueCalItems'


export function LeagueCal(props) {
    const history = useHistory()
    const location = new URLSearchParams(window.location.search)
    const [val, setVal] = useState(null)
    const [year, setYear] = useState(location.get('year') || '2020')
    const minDate = `${year}-01-01`
    const maxDate = `${year}-12-31`
    const [dateFrom, setDateFrom] = useState(location.get('dateFrom') || minDate)
    const [dateTo, setDateTo] = useState(location.get('dateTo') || maxDate)

    const dateFromSwitcher = (date) => setDateFrom(date)
    const dateToSwitcher = (date) => setDateTo(date)

    const yearSwitcher = (year) => {
        let loc = new URLSearchParams(window.location.search)
        loc.delete('dateFrom')
        loc.delete('dateTo')
        history.push({search : loc.toString()})
        setYear(year);
        setDateFrom(`${year}-01-01`)
        setDateTo(`${year}-12-31`)
        setVal(null)
        console.log('SWITCH', dateFrom, dateTo)
    }
    
    let { id } = useParams()
    const matches = `http://api.football-data.org/v2/competitions/${id}/matches?season=${year}` 
    useEffect(() => {
        fetch(matches, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
            .then(response => response.json())
            .then(json => setVal(json))
      }, [year])
    
    if (!val) { return <div>Loading....</div>}

    return (
        <>
            <h2>{val.competition.name} Calendar</h2>
            <h5>{val.count} matches found</h5>

            <DateFilter dateFromSwitcher={dateFromSwitcher}
                        dateToSwitcher={dateToSwitcher}
                        minDate={minDate}
                        maxDate={maxDate}
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        />
            <YearSelect yearSwitcher={yearSwitcher}/>
            <LeagueCalItems itemsArray={val.matches}
                            dateFrom={dateFrom}
                            dateTo={dateTo} />
        </> 
    )
}