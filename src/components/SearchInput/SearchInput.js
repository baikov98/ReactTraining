import { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { PathContext } from '../../PathContext'

function SearchInput({ setQueryString, queryString }) {
    const { setQuery } = useContext(PathContext)

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
