import { useHistory } from "react-router-dom";

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

export default function DateFilter(props) {
    const history = useHistory()
    const searchObj = new URLSearchParams(window.location.search)
    let dFrom = searchObj.get('dateFrom')
    let dTo = searchObj.get('dateTo')
    
    let dateFrom = searchObj.get('dateFrom') || props.minDate
    let dateTo = searchObj.get('dateTo') || props.maxDate
    
    const inputFromHandle = (e) => {
        if (new Date(e.target.value) > new Date(dateTo)) dateFrom = dateTo;
        else dateFrom = e.target.value;

        if (!searchObj.has('dateFrom')) searchObj.append('dateFrom', dateFrom)
        else searchObj.set('dateFrom', dateFrom)
        
        history.replace({search: searchObj.toString()})
        props.dateFromSwitcher(dateFrom)
      }
    const inputToHandle = (e) => {
        if (new Date(e.target.value) < new Date(dateFrom)) dateTo = dateFrom;
        else dateTo = e.target.value;

        if (!searchObj.has('dateTo')) searchObj.append('dateTo', dateTo)
        else searchObj.set('dateTo', dateTo)
        
        history.replace({search: searchObj.toString()})

        props.dateToSwitcher(dateTo)
      }
    
    return (
        <>
        <label htmlFor="start">From:</label>
        <input type="date" id="start" name="trip-start"
               value={dateFrom}
               onChange={inputFromHandle}
               min={props.minDate} 
               max={props.maxDate} />
        <label htmlFor="start">To:</label>
        <input type="date" id="start" name="trip-start"
               value={dateTo}
               onChange={inputToHandle}
               min={props.minDate}
               max={props.maxDate} />
        </>  
    )
}