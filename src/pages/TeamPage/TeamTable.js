import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'
import TableTemplate from '../../components/TableTemplate/TableTemplate'
import TableItem from './TableItem'

const headersArr = ['Region', 'League', 'Plan', 'Date']

function TeamTable({ array, year, dateFrom, dateTo }) {
    const filteredByYear = array.filter((val) => {
        return (new Date(val.lastUpdated).getFullYear() == year)
    })
    const filteredByDate = filteredByYear.filter((val) => {
      return (new Date(val.lastUpdated) >= new Date(dateFrom) && new Date(val.lastUpdated) <= new Date(dateTo))
    })
    
    return (
      <>
        {filteredByDate.length ? (<TableTemplate headersArr={headersArr} >
            {filteredByDate.map((i, index) => (
                <TableItem key={index} i={i} />
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

export default TeamTable