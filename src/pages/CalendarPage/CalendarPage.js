import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom";

import { PathContext } from '../../PathContext'
import YearSelect from '../../components/YearSelect/YearSelect'
import DateFilter from '../../components/DateFilter/DateFilter'
import CalendarTable from './CalendarTable'
import useDateFilter from '../../hooks/useDateFilter'
import Loader from '../../components/Loader/Loader'
import ShowError from '../../components/ShowError/ShowError'
import useFetchData from '../../hooks/useFetchData'

const yearArray = [2020, 2019, 2018]

const CalendarPage = (props) => {
    const { deleteQuery } = useContext(PathContext)
    const history = useHistory()
    const loc = new URLSearchParams(window.location.search)
    const [data, setData] = useState(null)
    const [year, setYear] = useState(loc.get('year') || yearArray[0])

    let { id } = useParams()
    const matches = `https://api.football-data.org/v2/competitions/${id}/matches/?season=${year}` 
    
    useFetchData(matches, [year], setData)
    useEffect(() => {
        minSwitcher(data ? data.matches[0].utcDate.slice(0, 10) : `${year}-01-01`)
        maxSwitcher(data ? data.matches[data.matches.length-1].utcDate.slice(0, 10) : `${+year+1}-12-31`)
    }, [data])
    let { minDate, maxDate, 
          dateFrom, dateTo, 
          dateFromSwitcher, dateToSwitcher,
          minSwitcher, maxSwitcher } = useDateFilter(year, loc.get('dateFrom'), loc.get('dateTo'))

    const yearSwitcher = (year) => {
        deleteQuery(history, ['dateFrom', 'dateTo'])
        setYear(year);
        setData(null)
    }

    if (!data) { return <Loader />}
    if (!data.competition) { return <ShowError error={data} /> }

    return (
        <>
            <h2>{data.competition.name} calendar</h2>
            
            <DateFilter dateFromSwitcher={dateFromSwitcher}
                        dateToSwitcher={dateToSwitcher}
                        minDate={minDate}
                        maxDate={maxDate}
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        />
            <YearSelect yearSwitcher={yearSwitcher}
                        yearArray={yearArray}
                        year={+year} />
            <CalendarTable itemsArray={data.matches}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            year={+year} />
        </> 
    )
}

export default CalendarPage