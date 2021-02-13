import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'
import TableTemplate from '../../components/TableTemplate/TableTemplate'
import TableItem from './TableItem'

const headersArr = ['Date', 'Home team', 'Score', 'Away team', 'Matchday']

function LeagueTable({ itemsArray, dateFrom, dateTo, year }) {
    const filteredItems = itemsArray.filter((item) => {
      let date = item.utcDate.slice(0, 10)
      return (new Date(date) >= new Date(dateFrom) && 
              new Date(date) <= new Date(dateTo) )
    })
    return (
        <>
          {filteredItems.length ? 
          (<TableTemplate headersArr={headersArr}>
          {filteredItems.map((i) => (<TableItem i={i} key={i.id} />))}
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