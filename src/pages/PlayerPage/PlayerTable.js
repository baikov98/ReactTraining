import React from 'react'
import PropTypes from 'prop-types'
import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'
import TableTemplate from '../../components/TableTemplate/TableTemplate'
import PlayerItem from './PlayerItem'

const headersArr = ['Date', 'Home team', 'Score', 'Away team', 'Matchday']

const PlayerTable = ({ itemsArray, dateFrom, dateTo }) => {
    const uniqueArray = itemsArray.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return index === itemsArray.findIndex(obj => {
          return JSON.stringify(obj) === _thing;
        });
    });
    const filteredItems = uniqueArray.filter((item) => {
      let date = item.utcDate.slice(0, 10)
      return (new Date(date) >= new Date(dateFrom) && 
              new Date(date) <= new Date(dateTo) )
    })
    return (
        <>
          {filteredItems.length ? 
          (<TableTemplate headersArr={headersArr}>
          {filteredItems.map((i) => (<PlayerItem i={i} key={i.id} />))}
          </TableTemplate>) : <NotFoundForQuery queryArray={[{name: 'From', 
                                                              desc: dateFrom},
                                                             {name: 'To', 
                                                              desc: dateTo}, 
                                                                          ]} /> }
        </>
    )
}

PlayerTable.propTypes = {
  itemsArray: PropTypes.arrayOf(PropTypes.object), 
  dateFrom: PropTypes.string, 
  dateTo: PropTypes.string, 
}

export default PlayerTable