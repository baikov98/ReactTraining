import { Link } from "react-router-dom";

function TableItem({ i }) {
    let finished = i.status === 'FINISHED' || i.status === 'AWARDED'
    let hscore = i.score.fullTime.homeTeam
    let ascore = i.score.fullTime.awayTeam
    let date = i.utcDate
    let dateOnly = date.slice(8,10)+'.'+date.slice(5,7)+'.'+date.slice(0,4)
    let timeOnly = date.slice(11,16)

    return (
      <tr>
        <td>{finished ? dateOnly : dateOnly + ', ' + timeOnly}</td> 
        <td><Link to={`/teams/${i.homeTeam.id}`}>{i.homeTeam.name}</Link></td> 
        <td>{finished ? hscore : '-'} : {finished ? ascore : '-'}</td>
        <td><Link to={`/teams/${i.awayTeam.id}`}>{i.awayTeam.name}</Link></td>
        <td>{i.matchday}</td> 
      </tr>
    )
  }

export default TableItem