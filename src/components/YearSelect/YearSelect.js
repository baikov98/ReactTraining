import { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Context from '../../context'

function SelectOption({ value }) {
    return ( <option value={value}>{value}</option> )
}

function YearSelect({ yearSwitcher, yearArray }) {
    const { setQuery } = useContext(Context)
    const loc = new URLSearchParams(window.location.search)
    const [year, setYear] = useState(loc.has('year') ? loc.get('year') : yearArray[0])

    const history = useHistory()

    const inputHandle = (e) => {
        setQuery(history, 'year', e.target.value)
        setYear(prev => e.target.value)
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