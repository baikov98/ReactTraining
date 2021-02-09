import { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Context from '../../context'

export default function SearchInput({ setQueryString }) {
    const { setQuery } = useContext(Context)
    const searchObj = new URLSearchParams(window.location.search)
    const query = searchObj.has('query') ? searchObj.get('query') : '';

    const [search, setSearch] = useState(query)
    useEffect(() => {setSearch(query)}, [window.location.search])

    const history = useHistory()
    const inputHandle = (e) => {
        setQuery(history, 'query', e.target.value)
        setQueryString(e.target.value || '')
        setSearch(e.target.value || '')
      }
    
    return (
        <><input type="text" onChange={inputHandle} value={search} /></>
    )
}


