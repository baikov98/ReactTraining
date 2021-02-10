import { Link } from "react-router-dom";

function TableItem({ i }) {
    return (
      <tr>
        <td>{new Date(i.utcDate).toLocaleString()}</td>
        <td><Link to={`/teams/${i.homeTeam.id}`}>{i.homeTeam.name}</Link></td> 
        <td>{i.score.fullTime.homeTeam} : {i.score.fullTime.awayTeam}</td>
        <td><Link to={`/teams/${i.awayTeam.id}`}>{i.awayTeam.name}</Link></td>
      </tr>
    )
  }

export default TableItem