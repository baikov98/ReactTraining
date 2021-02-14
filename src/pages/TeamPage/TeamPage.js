import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from "react-router-dom";
import TeamTable from './TeamTable'
import YearSelect from '../../components/YearSelect/YearSelect'
import DateFilter from '../../components/DateFilter/DateFilter'
import TeamMembers from './TeamMembers'
import { PathContext } from '../../PathContext'
import useDateFilter from '../../hooks/useDateFilter'
import Loader from '../../components/Loader/Loader'
import ShowError from '../../components/ShowError/ShowError'
import useFetchData from '../../hooks/useFetchData'

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
    const team = `http://api.football-data.org/v2/teams/${id}`
    
    useFetchData(team, [], setData)

    if (!data) {return <Loader />}
    if (!data.activeCompetitions) { return <ShowError error={data} /> }
    console.log(data)
    return (
        <div>
        <h2 className='mb-2'>{data.name} ({data.area.name})</h2>
        {data.crestUrl ? <img src={data.crestUrl} className='mb-2'/> : null} 
        <ul className='team-info'>
          <li><strong>Founded:</strong> {data.founded}</li>
          <li><strong>Venue:</strong> {data.venue}</li>
          <li><strong>Website:</strong> {data.website}</li>
          <li><strong>Email:</strong> {data.email}</li>
        </ul>
        <div className='.d-inline-flex'>
          <DateFilter dateFromSwitcher={dateFromSwitcher}
                      dateToSwitcher={dateToSwitcher}
                      minDate={minDate}
                      maxDate={maxDate}
                      dateFrom={dateFrom}
                      dateTo={dateTo}
                          />
          <YearSelect yearSwitcher={yearSwitcher} 
                      yearArray={yearArray} 
                      year={+year} />
        </div>
        <h4>Active Competitions</h4>
        <TeamTable year={+year}
                   array={data.activeCompetitions}
                   dateFrom={dateFrom}
                   dateTo={dateTo} />
        <h4>Team</h4>
        {data.squad.length ? <TeamMembers squad={data.squad} /> : <></>}
      </div>
    )
}

export default TeamPage