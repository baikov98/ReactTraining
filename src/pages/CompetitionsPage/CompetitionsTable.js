import React from 'react'
import PropTypes from 'prop-types'
import CompetitionsItem from './CompetitionsItem'
import TableTemplate from '../../components/TableTemplate/TableTemplate'
import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'

const CompetitionsTable = ({ leagueArr, query, year }) => {
    const FilteredByQuery = leagueArr
                    .filter((val, i) => {
                    if (query === '') return val;
                    if (val.name.toLowerCase().includes(query.toLowerCase())) return val })
    const FilteredByYear = FilteredByQuery.filter((val) => {
                        return new Date(val.currentSeason.startDate).getFullYear() == year })
    const ItemsCompetition = FilteredByYear.map((i) => (
        <CompetitionsItem key={i.id} i={i} />
    ))
    const headersArr = [' ', 'Region', 'League', 'Calendar', 'Standings', 'Start Date', 'End Date']
    return (
        <>
        { ItemsCompetition.length ? (<TableTemplate headersArr={headersArr}>
            {ItemsCompetition}
        </TableTemplate>) : <NotFoundForQuery queryArray={[{name: 'search query', 
                                                          desc: query}, 
                                                          {name: 'year',
                                                          desc: year}]} />} 
        </>
    )
}

CompetitionsTable.propTypes = {
    leagueArr: PropTypes.arrayOf(PropTypes.object), 
    query: PropTypes.string, 
    year: PropTypes.number
}
  
export default CompetitionsTable