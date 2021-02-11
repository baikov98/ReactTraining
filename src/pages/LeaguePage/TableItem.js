import { Link } from "react-router-dom";

function TableItem({ i }) {
    let hscore = i.score.fullTime.homeTeam
    let ascore = i.score.fullTime.awayTeam
    let date = new Date(i.utcDate)
    let correctedDateStr = date.toLocaleString().slice(0, date.toLocaleString().length-3)
    console.log(hscore)
    return (
      <tr>
        <td>{hscore === null ? correctedDateStr : date.toLocaleDateString() }</td> 
        <td><Link to={`/teams/${i.homeTeam.id}`}>{i.homeTeam.name}</Link></td> 
        <td>{hscore === null ? '-' : hscore} : {ascore === null ? '-' : ascore}</td>
        <td><Link to={`/teams/${i.awayTeam.id}`}>{i.awayTeam.name}</Link></td>
      </tr>
    )
  }

export default TableItem