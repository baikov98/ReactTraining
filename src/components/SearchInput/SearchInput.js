import { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Context from '../../context'

function SearchInput({ setQueryString, queryString }) {
    const { setQuery } = useContext(Context)

    const history = useHistory()
    const inputHandle = (e) => {
        setQuery(history, 'query', e.target.value)
        setQueryString(e.target.value || '')
    }
    
    return (
        <><input type="text" onChange={inputHandle} value={queryString} /></>
    )
}

export default SearchInput
