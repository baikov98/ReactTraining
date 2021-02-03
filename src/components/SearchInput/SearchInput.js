import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";

export function getQuery() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get('query') || '';
  }

export default function SearchInput(props) {
    const query = getQuery()
    const [search, setSearch] = useState(query)
    let history = useHistory()

    const inputHandle = (e) => {
        if (e.target.value) history.push(`/?query=${e.target.value}`)
        else history.push('')
        setSearch(e.target.value)
      }
    return (
        <>
        <input type="text" onChange={inputHandle} value={search} ref={props.inputRef} />
        </>
    )
}


