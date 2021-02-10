import { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom";
import TeamTable from './TeamTable'
import YearSelect from '../../components/YearSelect/YearSelect'
import DateFilter from '../../components/DateFilter/DateFilter'
import Context from '../../context'

export default function TeamPage(props) {
    const { deleteQuery } = useContext(Context)
    const yearArray = [2021, 2020, 2019, 2018]
    const location = new URLSearchParams(window.location.search)
    const history = useHistory()
    const yearParam = location.get('year') || yearArray[0]; //getting year from url
    const [year, setYear] = useState(yearParam)
    const minDate = `${year}-01-01`
    const maxDate = `${year}-12-31`
    
    const [dateFrom, setDateFrom] = useState(location.get('dateFrom') || minDate)
    const [dateTo, setDateTo] = useState(location.get('dateTo') || maxDate)
    
    const dateFromSwitcher = (date) => setDateFrom(date)
    const dateToSwitcher = (date) => setDateTo(date)

    const [ val, setVal ] = useState(null)
    const yearSwitcher = (year) => {
      deleteQuery(history, ['dateFrom', 'dateTo'])
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
        <YearSelect yearSwitcher={yearSwitcher} yearArray={yearArray}  />
        <h4>Active Competitions</h4>
        <TeamTable year={year}
                   array={val.activeCompetitions}
                   dateFrom={dateFrom}
                   dateTo={dateTo} />
      </div>
    )
}

