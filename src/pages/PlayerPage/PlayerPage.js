import React from 'react'
import PropTypes from 'prop-types'
import { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom";

import { PathContext } from '../../PathContext'
import YearSelect from '../../components/YearSelect/YearSelect'
import DateFilter from '../../components/DateFilter/DateFilter'
import PlayerTable from './PlayerTable'
import useDateFilter from '../../hooks/useDateFilter'
import ShowError from '../../components/ShowError/ShowError'

const PlayerPage = (props) => {
    const { deleteQuery } = useContext(PathContext)
    const history = useHistory()
    const loc = new URLSearchParams(window.location.search)
    const [data, setData] = useState(null)

    let { id } = useParams()
    const matches = `http://api.football-data.org/v2/players/${id}/matches` 
    useEffect(() => {
        fetch(matches, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
            .then(response => response.json())
            .then(json => setData(json))
            .catch(e => setData({fetchError : e}))
    }, [])

    useEffect(() => {
        let currentYear = +new Date().getFullYear()
        let reversed = data?.matches ? data.matches.slice(0).reverse() : []
        minSwitcher(reversed.length ? reversed[0].utcDate.slice(0, 10) 
                                    : `${currentYear-4}-01-01`)
        maxSwitcher(reversed.length ? reversed[reversed.length-1].utcDate.slice(0, 10) 
                                    : `${currentYear}-12-31`)
    }, [data])

    let { minDate, maxDate, 
          dateFrom, dateTo, 
          dateFromSwitcher, dateToSwitcher,
          minSwitcher, maxSwitcher } = useDateFilter(null, loc.get('dateFrom'), loc.get('dateTo'))

    if (!data) { return <div>Loading....</div>}
    if (data.fetchError) { return <ShowError error={data.fetchError} /> }

    return (
        <>
            <h2>{data.player.name} calendar</h2>
            <ul>
                <li><strong>Birth date:</strong> {data.player.dateOfBirth}</li>
                <li><strong>Birth country:</strong> {data.player.countryOfBirth}</li>
                <li><strong>Nationality:</strong> {data.player.nationality}</li>
                <li><strong>Position:</strong> {data.player.position}</li>
            </ul>
            <DateFilter dateFromSwitcher={dateFromSwitcher}
                        dateToSwitcher={dateToSwitcher}
                        minDate={minDate}
                        maxDate={maxDate}
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        />
            
            <PlayerTable itemsArray={data.matches}
                         dateFrom={dateFrom}
                         dateTo={dateTo}
                                         />
        </> 
    )
}

export default PlayerPage