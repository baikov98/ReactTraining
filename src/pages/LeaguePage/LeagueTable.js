import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'
import TableTemplate from '../../components/TableTemplate/TableTemplate'
import TableItem from './TableItem'

const headersArr = ['Date', 'Home team', 'Score', 'Away team']

function LeagueTable({ itemsArray, dateFrom, dateTo, year }) {
    const filteredItems = itemsArray.filter((item) => {
      return (new Date(item.utcDate) >= new Date(dateFrom) && 
              new Date(item.utcDate) <= new Date(dateTo) )
    })
    return (
        <>
          {filteredItems.length ? 
          (<TableTemplate headersArr={headersArr}>
          {filteredItems.map((i, index) => (<TableItem i={i} key={index} />))}
          </TableTemplate>) : <NotFoundForQuery queryArray={[{name: 'From', 
                                                          desc: dateFrom},
                                                          {name: 'To', 
                                                          desc: dateTo}, 
                                                          {name: 'year',
                                                          desc: year}]} /> }
        </>
    )
}

export default LeagueTable