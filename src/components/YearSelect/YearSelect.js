import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";
import { PathContext } from '../../PathContext'

function SelectOption({ value }) {
    return ( <option value={value}>{value}</option> )
}

function YearSelect({ yearSwitcher, yearArray, year }) {
    const { setQuery } = useContext(PathContext)
    const history = useHistory()

    const inputHandle = (e) => {
        let val = e.target.value.slice(0, 4)
        setQuery(history, 'year', val)
        yearSwitcher(val)
    }
    const optionsArr = yearArray.map((val, i) => 
            (<SelectOption value={`${val}/${+val+1}`} key={val} />))

    return (
        <select onChange={inputHandle} value={`${year}/${+year+1}`}>
            {optionsArr}
        </select>
    )
}

YearSelect.propTypes = {
    yearSwitcher: PropTypes.func, 
    yearArray: PropTypes.arrayOf(PropTypes.number), 
    year: PropTypes.number
}

SelectOption.propTypes = {
    value: PropTypes.string
}

export default YearSelect