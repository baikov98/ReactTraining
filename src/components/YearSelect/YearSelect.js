import { useHistory } from "react-router-dom";

function SelectOption({ value }) {
    return (
        <option value={value}>{value}</option>
    )
}

export default function YearSelect({ yearSwitcher, yearArray }) {
    const searchObj = new URLSearchParams(window.location.search)
    let year = searchObj.has('year') ? searchObj.get('year') : yearArray[0]

    const history = useHistory()

    const inputHandle = (e) => {
        if (!searchObj.has('year')) searchObj.append('year', e.target.value);
        else searchObj.set('year', e.target.value);
        history.push({
            search: searchObj.toString()
        })
        year = e.target.value
        yearSwitcher(year)
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
