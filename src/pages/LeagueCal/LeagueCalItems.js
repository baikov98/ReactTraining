import React from 'react'
 
function CalItem({ i }) {
  return (
    <tr>
      <td>{new Date(i.utcDate).toLocaleString()}</td>
      <td>{i.homeTeam.name}</td>
      <td>{i.score.fullTime.homeTeam} : {i.score.fullTime.awayTeam}</td>
      <td>{i.awayTeam.name}</td>
    </tr>
  )
}

function LeagueTable({ children }) {
    return (
      <>
        <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Хозяева</th>
                <th>Счет</th>
                <th>Гости</th>
              </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
        </table>
      </>
    )
}

export default function LeagueCalItems({ itemsArray, dateFrom, dateTo }) {
    const filteredItems = itemsArray.filter((item) => {
      return (new Date(item.utcDate) >= new Date(dateFrom) && 
              new Date(item.utcDate) <= new Date(dateTo) )
    })
    return (
        <>
          {filteredItems.length ? 
          (<LeagueTable>
          {filteredItems.map((i, index) => (<CalItem i={i} key={index} />))}
          </LeagueTable>) : <p>Not found</p>}
        </>
    )
}