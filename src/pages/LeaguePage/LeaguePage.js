import { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom";

import Context from '../../context'
import YearSelect from '../../components/YearSelect/YearSelect'
import DateFilter from '../../components/DateFilter/DateFilter'
import LeagueTable from './LeagueTable'
const yearArray = [2021, 2020, 2019, 2018]

function LeaguePage(props) {
    const { deleteQuery } = useContext(Context)
    const history = useHistory()
    const loc = new URLSearchParams(window.location.search)
    const [val, setVal] = useState(null)
    const [year, setYear] = useState(loc.get('year') || yearArray[0])
    const minDate = `${year}-01-01`
    const maxDate = `${year}-12-31`
    const [dateFrom, setDateFrom] = useState(loc.get('dateFrom') || minDate)
    const [dateTo, setDateTo] = useState(loc.get('dateTo') || maxDate)

    const dateFromSwitcher = (date) => setDateFrom(date)
    const dateToSwitcher = (date) => setDateTo(date)

    const yearSwitcher = (year) => {
        deleteQuery(history, ['dateFrom', 'dateTo'])
        setYear(year);
        setDateFrom(`${year}-01-01`)
        setDateTo(`${year}-12-31`)
        setVal(null)
    }
    
    let { id } = useParams()
    const matches = `http://api.football-data.org/v2/competitions/${id}/matches` 
    useEffect(() => {
        fetch(matches, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
            .then(response => response.json())
            .then(json => setVal(json))
      }, [year])
    
    if (!val) { return <div>Loading....</div>}

    return (
        <>
            <h2>{val.competition.name} Calendar</h2>
            

            <DateFilter dateFromSwitcher={dateFromSwitcher}
                        dateToSwitcher={dateToSwitcher}
                        minDate={minDate}
                        maxDate={maxDate}
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        />
            <YearSelect yearSwitcher={yearSwitcher}
                        yearArray={yearArray}
                        year={year} />
            <LeagueTable itemsArray={val.matches}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            year={year} />
        </> 
    )
}

export default LeaguePage