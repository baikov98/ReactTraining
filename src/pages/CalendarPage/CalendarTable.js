import React from 'react'
import PropTypes from 'prop-types'
import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'
import TableTemplate from '../../components/TableTemplate/TableTemplate'
import CalendarItem from './CalendarItem'

const headersArr = ['Date', 'Home team', 'Score', 'Away team', 'MD']

const CalendarTable = ({ itemsArray, dateFrom, dateTo, year }) => {
    const filteredItems = itemsArray.filter((item) => {
      let date = item.utcDate.slice(0, 10)
      return (new Date(date) >= new Date(dateFrom) && 
              new Date(date) <= new Date(dateTo) )
    })
    return (
        <>
          {filteredItems.length ? 
          (<TableTemplate headersArr={headersArr}>
          {filteredItems.map((i) => (<CalendarItem i={i} key={i.id} />))}
          </TableTemplate>) : <NotFoundForQuery queryArray={[{name: 'From', 
                                                              desc: dateFrom},
                                                             {name: 'To', 
                                                              desc: dateTo}, 
                                                             {name: 'year',
                                                              desc: year}]} /> }
        </>
    )
}
CalendarTable.propTypes = {
  itemsArray: PropTypes.arrayOf(PropTypes.object), 
  dateFrom: PropTypes.string, 
  dateTo: PropTypes.string, 
  year: PropTypes.number
}

export default CalendarTable