import { useState } from 'react'

const useDateFilter = (year, from, to) => {
    
    let [minDate, setMinDate] = useState(`${year}-01-01`)
    let [maxDate, setMaxDate] = useState(`${+year+1}-12-31`)
    let [dateFrom, setDateFrom] = useState(from || minDate)
    let [dateTo, setDateTo] = useState(to || maxDate)
    const dateFromSwitcher = (date) => setDateFrom(date)
    const dateToSwitcher = (date) => setDateTo(date)
    const minSwitcher = (date) => {
        const loc = new URLSearchParams(window.location.search)
        setMinDate(date)
        setDateFrom(loc.get('dateFrom') || date)
    }
    const maxSwitcher = (date) => {
        const loc = new URLSearchParams(window.location.search)
        setMaxDate(date)
        setDateTo(loc.get('dateTo') || date)
    }
    return {minDate, maxDate, dateFrom, dateTo, dateFromSwitcher, dateToSwitcher, minSwitcher, maxSwitcher}
}

export default useDateFilter