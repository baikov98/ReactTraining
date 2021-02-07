import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

function SelectOption(props) {
    return (
        <option value={props.value}>{props.value}</option>
    )
}

export default function YearSelect(props) {
    const searchObj = new URLSearchParams(window.location.search)
    let year = searchObj.has('year') ? searchObj.get('year') : ''

    const history = useHistory()
    const yearArray = [2020, 2019, 2018]
    const inputHandle = (e) => {
        if (!searchObj.has('year')) searchObj.append('year', e.target.value);
        else searchObj.set('year', e.target.value);
        history.push({
            search: searchObj.toString()
        })
        year = e.target.value
        props.yearSwitcher(year)
      }
    const optionsArr = yearArray.map((val, i) => (<SelectOption value={val}
                                                                key={i} 
                                                                 />))
    return (
        <>
        <select onChange={inputHandle} value={year}>
            {optionsArr}
        </select>
        </>
    )
}
