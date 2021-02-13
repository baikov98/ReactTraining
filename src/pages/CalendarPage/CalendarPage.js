import { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom";

import { PathContext } from '../../PathContext'
import YearSelect from '../../components/YearSelect/YearSelect'
import DateFilter from '../../components/DateFilter/DateFilter'
import CalendarTable from './CalendarTable'
import useDateFilter from '../../hooks/useDateFilter'
const yearArray = [2020, 2019, 2018]

function CalendarPage(props) {
    const { deleteQuery } = useContext(PathContext)
    const history = useHistory()
    const loc = new URLSearchParams(window.location.search)
    const [val, setVal] = useState(null)
    const [year, setYear] = useState(loc.get('year') || yearArray[0])

    let { id } = useParams()
    const matches = `http://api.football-data.org/v2/competitions/${id}/matches/?season=${year}` 
    useEffect(() => {
        fetch(matches, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
            .then(response => response.json())
            .then(json => setVal(json))
    }, [year])
    useEffect(() => {
        minSwitcher(val ? val.matches[0].utcDate.slice(0, 10) : `${year}-01-01`)
        maxSwitcher(val ? val.matches[val.matches.length-1].utcDate.slice(0, 10) : `${+year+1}-12-31`)
    }, [val])
    let { minDate, maxDate, 
          dateFrom, dateTo, 
          dateFromSwitcher, dateToSwitcher,
          minSwitcher, maxSwitcher } = useDateFilter(year, loc.get('dateFrom'), loc.get('dateTo'))

    const yearSwitcher = (year) => {
        deleteQuery(history, ['dateFrom', 'dateTo'])
        setYear(year);
        setVal(null)
    }

    if (!val) { return <div>Loading....</div>}
    console.log(val)
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
            <CalendarTable itemsArray={val.matches}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            year={year} />
        </> 
    )
}

export default CalendarPage