import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const CalendarItem = ({ i }) => {
    let finished = i.status === 'FINISHED' || i.status === 'AWARDED'
    let hscore = i.score.fullTime.homeTeam
    let ascore = i.score.fullTime.awayTeam
    let date = i.utcDate
    let dateOnly = date.slice(8,10)+'-'+date.slice(5,7)+'-'+date.slice(0,4)
    let timeOnly = date.slice(11,16)

    return (
      <tr>
        <td className='text-impact'>{finished ? dateOnly : dateOnly + ', ' + timeOnly}</td> 
        <td><Link to={`/teams/${i.homeTeam.id}`}>{i.homeTeam.name}</Link></td> 
        <td className='text-center'>{finished ? hscore : '-'} : {finished ? ascore : '-'}</td>
        <td><Link to={`/teams/${i.awayTeam.id}`}>{i.awayTeam.name}</Link></td>
        <td>{i.matchday}</td> 
      </tr>
    )
  }

CalendarItem.propTypes = {
  i: PropTypes.object
}

export default CalendarItem