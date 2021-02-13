import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from "react-router-dom";
import TeamTable from './TeamTable'
import YearSelect from '../../components/YearSelect/YearSelect'
import DateFilter from '../../components/DateFilter/DateFilter'
import TeamMembers from './TeamMembers'
import { PathContext } from '../../PathContext'
import useDateFilter from '../../hooks/useDateFilter'
const yearArray = [2021, 2020, 2019, 2018]

const TeamPage = (props) => {
    const [ data, setData ] = useState(null)
    const { deleteQuery } = useContext(PathContext)
    const history = useHistory()
    const loc = new URLSearchParams(window.location.search)
    const yearParam = loc.get('year') || yearArray[0]
    const [year, setYear] = useState(yearParam)
    let { minDate, maxDate, 
          dateFrom, dateTo, 
          dateFromSwitcher, dateToSwitcher,
          minSwitcher, maxSwitcher } = useDateFilter(year, loc.get('dateFrom'), loc.get('dateTo'))

    const yearSwitcher = (year) => {
      deleteQuery(history, ['dateFrom', 'dateTo'])
      setYear(year)
      minSwitcher(`${year}-01-01`)
      maxSwitcher(`${+year+1}-12-31`)
    }

    const { id } = useParams()
    const teamurl = `http://api.football-data.org/v2/teams/${id}`
    useEffect(() => {
      console.log('TEAMPAGE FETCH')
        fetch(teamurl, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
          .then(response => response.json())
          .then(json => setData(json))
    }, [])
    const goBack = () => history.goBack()
    if (!data) {return <div>Loading ...</div>}
    console.log(data)
    return (
        <div>
        <h2>{data.name} ({data.area.name})</h2>
        <button onClick={goBack}>BACK</button>
        <DateFilter dateFromSwitcher={dateFromSwitcher}
                    dateToSwitcher={dateToSwitcher}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                        />
        <YearSelect yearSwitcher={yearSwitcher} 
                    yearArray={yearArray} 
                    year={year} />
        <h4>Active Competitions</h4>
        <TeamTable year={year}
                   array={data.activeCompetitions}
                   dateFrom={dateFrom}
                   dateTo={dateTo} />
        {data.squad.length ? <TeamMembers squad={data.squad} /> : <></>}
      </div>
    )
}

export default TeamPage