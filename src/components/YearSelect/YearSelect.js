import { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Context from '../../context'

function SelectOption({ value }) {
    return ( <option value={value}>{value}</option> )
}

function YearSelect({ yearSwitcher, yearArray, year }) {
    const { setQuery } = useContext(Context)
    const history = useHistory()

    const inputHandle = (e) => {
        setQuery(history, 'year', e.target.value)
        yearSwitcher(e.target.value)
      }
    const optionsArr = yearArray.map((val, i) => 
            (<SelectOption value={val} key={i} />))

    return (
        <>
        <select onChange={inputHandle} value={year}>
            {optionsArr}
        </select>
        </>
    )
}

export default YearSelect