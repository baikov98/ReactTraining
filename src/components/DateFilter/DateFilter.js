import { useContext } from 'react'
import { useHistory } from "react-router-dom";
import Context from '../../context'

export function getCorrectDateFrom(dFrom, minDate, maxDate, history){
  if (new Date(dFrom) >= new Date(minDate) && new Date(dFrom) <= new Date(maxDate)) return dFrom
  else {
    let loc = new URLSearchParams(window.location.search)
    loc.set('dateFrom', minDate)
    history.replace({search : loc.toString()})
    return minDate }
}

export function getCorrectDateTo(dTo, minDate, maxDate, history){
  if (new Date(dTo) >= new Date(minDate) && new Date(dTo) <= new Date(maxDate)) return dTo
  else {
    let loc = new URLSearchParams(window.location.search)
    loc.set('dateTo', maxDate)
    history.replace({search : loc.toString()})
    return maxDate }
}

export default function DateFilter({ dateFromSwitcher, dateToSwitcher, maxDate, minDate }) {
    const { setQuery, getQuery } = useContext(Context)
    const history = useHistory()
    const searchObj = new URLSearchParams(window.location.search)
    
    let dateFrom = searchObj.get('dateFrom') || minDate
    let dateTo = searchObj.get('dateTo') || maxDate
    
    const inputFromHandle = (e) => {
        let result = e.target.value;
        if (new Date(e.target.value) >= new Date(dateTo)) result = dateTo;
        setQuery(history, 'dateFrom', result)
        dateFromSwitcher(result)
      }
    const inputToHandle = (e) => {
        let result = e.target.value;
        if (new Date(e.target.value) <= new Date(dateFrom)) result = dateFrom;
        setQuery(history, 'dateTo', result)
        dateToSwitcher(result)
      }
    
    return (
        <>
        <label htmlFor="start">From:</label>
        <input type="date" id="start" name="trip-start"
               value={dateFrom}
               onChange={inputFromHandle}
               min={minDate} 
               max={maxDate} />
        <label htmlFor="start">To:</label>
        <input type="date" id="start" name="trip-start"
               value={dateTo}
               onChange={inputToHandle}
               min={minDate}
               max={maxDate} />
        </>  
    )
}