import React, { useEffect, useState } from 'react'
import {
  Link,
  useParams,
  useHistory
} from "react-router-dom";
import TeamCompTable from './TeamCompTable'
import YearSelect from '../../components/YearSelect/YearSelect'
import DateFilter from '../../components/DateFilter/DateFilter'

function ActiveCompetition(props) {
    return (
        <tr>
        <td>{props.region}</td>
        <td>{props.league}</td>
        <td>{props.plan}</td>
        <td>{new Date(props.date).toLocaleDateString()}</td>
      </tr>
    )
}

export default function Team(props) {
    const location = new URLSearchParams(window.location.search)
    const history = useHistory()
    const yearParam = location.get('year') || '2021'; //getting year from url
    const [year, setYear] = useState(yearParam)
    const minDate = `${year}-01-01`
    const maxDate = `${year}-12-31`
    
    const [dateFrom, setDateFrom] = useState(location.get('dateFrom') || minDate)
    const [dateTo, setDateTo] = useState(location.get('dateTo') || maxDate)
    
    const dateFromSwitcher = (date) => setDateFrom(date)
    const dateToSwitcher = (date) => setDateTo(date)

    const [ val, setVal ] = useState(null)
    const yearSwitcher = (year) => {
      let loc = new URLSearchParams(window.location.search)
      loc.delete('dateFrom')
      loc.delete('dateTo')
      history.push({search : loc.toString()})
      setYear(year)
      setDateFrom(`${year}-01-01`)
      setDateTo(`${year}-12-31`)
    }

    const { id } = useParams()
    const teamurl = `http://api.football-data.org/v2/teams/${id}`
    useEffect(() => {
        fetch(teamurl, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setVal(json))
    }, [])
    if (!val) {return <div>Loading ...</div>}
    console.log(val)
    console.log('here', dateFrom)
    return (
        <div>
        <h2>{val.name} ({val.area.name})</h2>
        <DateFilter dateFromSwitcher={dateFromSwitcher}
                    dateToSwitcher={dateToSwitcher}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                        />
        <YearSelect yearSwitcher={yearSwitcher} yearArray={[2021, 2020, 2019, 2018]}  />
        <h4>Active Competitions</h4>
        <TeamCompTable year={year}
                       array={val.activeCompetitions}
                       dateFrom={dateFrom}
                       dateTo={dateTo} />
      </div>
    )
}

