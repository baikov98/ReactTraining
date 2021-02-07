import React, { Children } from 'react'

function TableItem({ i }) {
    return (
        <tr>
            <td>{i.area.name}</td>
            <td>{i.name}</td>
            <td>{i.plan}</td>
            <td>{new Date(i.lastUpdated).toLocaleDateString()}</td>
        </tr>
    )
}

function CompititionsTable({ children }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>League</th>
            <th>Plan</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {children} 
        </tbody>
      </table>)
}

export default function TeamCompTable({ array, year, dateFrom, dateTo }) {
    console.log(dateFrom, dateTo)
    const filteredByYear = array.filter((val) => {
        return (new Date(val.lastUpdated).getFullYear() == year)
    })
    const filteredByDate = filteredByYear.filter((val) => {
      console.log((new Date(val.lastUpdated)).toLocaleDateString(), dateFrom )
      return (new Date(val.lastUpdated) >= new Date(dateFrom) && new Date(val.lastUpdated) <= new Date(dateTo))
    })
    
    return (
        <CompititionsTable>
            {filteredByDate.map((i, index) => (
                <TableItem key={index} i={i} />
            ))}
        </CompititionsTable>
    )
}