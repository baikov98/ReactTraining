import React from 'react'
import PropTypes from 'prop-types'
import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'
import TableTemplate from '../../components/TableTemplate/TableTemplate'
import TeamItem from './TeamItem'

const headersArr = ['Region', 'League', 'Tier', 'Date']

const TeamTable = ({ array, year, dateFrom, dateTo }) => {
    const filteredByYear = array.filter((val) => {
        return (new Date(val.lastUpdated).getFullYear() === year)
    })
    const filteredByDate = filteredByYear.filter((val) => {
      return (new Date(val.lastUpdated) >= new Date(dateFrom) && new Date(val.lastUpdated) <= new Date(dateTo))
    })
    
    return (
      <>
        {filteredByDate.length ? (<TableTemplate headersArr={headersArr} >
            {filteredByDate.map((i) => (
                <TeamItem key={i.id} i={i} />
            ))}
        </TableTemplate>) : <NotFoundForQuery queryArray={[{name: 'From', 
                                                          desc: dateFrom},
                                                          {name: 'To', 
                                                          desc: dateTo}, 
                                                          {name: 'year',
                                                          desc: year}]} /> }
      </>
    )
}

TeamTable.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object), 
  year: PropTypes.number,
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
}

export default TeamTable