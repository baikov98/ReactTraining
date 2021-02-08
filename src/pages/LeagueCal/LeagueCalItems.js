import { Link } from "react-router-dom";
import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'

function CalItem({ i }) {
  return (
    <tr>
      <td>{new Date(i.utcDate).toLocaleString()}</td>
      <td><Link to={`/teams/${i.homeTeam.id}`}>{i.homeTeam.name}</Link></td> 
      <td>{i.score.fullTime.homeTeam} : {i.score.fullTime.awayTeam}</td>
      <td><Link to={`/teams/${i.awayTeam.id}`}>{i.awayTeam.name}</Link></td>
    </tr>
  )
}

function LeagueTable({ children }) {
    return (
      <>
        <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Home team</th>
                <th>Scores</th>
                <th>Away team</th>
              </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
        </table>
      </>
    )
}

export default function LeagueCalItems({ itemsArray, dateFrom, dateTo, year }) {
    const filteredItems = itemsArray.filter((item) => {
      return (new Date(item.utcDate) >= new Date(dateFrom) && 
              new Date(item.utcDate) <= new Date(dateTo) )
    })
    return (
        <>
          {filteredItems.length ? 
          (<LeagueTable>
          {filteredItems.map((i, index) => (<CalItem i={i} key={index} />))}
          </LeagueTable>) : <NotFoundForQuery queryArray={[{name: 'From', 
                                                          desc: dateFrom},
                                                          {name: 'To', 
                                                          desc: dateTo}, 
                                                          {name: 'year',
                                                          desc: year}]} /> }
        </>
    )
}