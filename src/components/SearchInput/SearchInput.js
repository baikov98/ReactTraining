import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

export default function SearchInput(props) {
    const searchObj = new URLSearchParams(window.location.search)
    const query = searchObj.has('query') ? searchObj.get('query') : '';
    const [search, setSearch] = useState(query)
    const history = useHistory()
    
    const inputHandle = (e) => {
        
        if (!searchObj.has('query')) searchObj.append('query', e.target.value);
        else if (!e.target.value)    searchObj.delete('query');
        else searchObj.set('query', e.target.value);
        history.replace({
            search: searchObj.toString()
        })
        setSearch(searchObj.get('query') || '')
      }
    
    return (
        <><input type="text" onChange={inputHandle} value={search} /></>
    )
}


