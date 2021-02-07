import React from 'react'


export default function LeagueCalItem(props) {
    let date = new Date(props.utcDate)
    return (
        <tr>
        <td>{date.toLocaleString()}</td>
        <td>{props.homeTeam}</td>
        <td>{props.scoreHomeTeam} : {props.scoreAwayTeam}</td>
        <td>{props.awayTeam}</td>
      </tr>
    )
}