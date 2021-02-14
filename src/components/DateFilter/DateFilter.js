import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";
import { PathContext } from '../../PathContext'


const DateFilter = ({ dateFromSwitcher, dateToSwitcher, maxDate, minDate, dateFrom, dateTo }) => {
    const { setQuery, getQuery } = useContext(PathContext)
    const history = useHistory()
    
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
        <div className='d-inline-flex mb-2'>
          <input type="date" id="start" name="date-start"
                className='form-control mr-2'
                value={dateFrom}
                onChange={inputFromHandle}
                min={minDate} 
                max={maxDate} />
          <input type="date" id="end" name="date-end"
                className='form-control mr-2'
                value={dateTo}
                onChange={inputToHandle}
                min={minDate}
                max={maxDate} />
        </div>  
    )
}

DateFilter.propTypes = {
  dateFromSwitcher: PropTypes.func, 
  dateToSwitcher: PropTypes.func, 
  maxDate: PropTypes.string, 
  minDate: PropTypes.string, 
  dateFrom: PropTypes.string, 
  dateTo: PropTypes.string
}

export default DateFilter