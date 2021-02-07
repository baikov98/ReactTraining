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

export default function TeamCompTable({ array, year }) {
    const filteredByYear = array.filter((val) => {
        console.log( 'here', new Date(val.lastUpdated).getFullYear(), year, (new Date(val.lastUpdated).getFullYear() == year))
        return (new Date(val.lastUpdated).getFullYear() == year)
    })
    
    
    return (
        <CompititionsTable>
            {filteredByYear.map((i, index) => (
                <TableItem key={index} i={i} />
            ))}
        </CompititionsTable>
    )
}