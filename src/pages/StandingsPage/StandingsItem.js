import { Link } from "react-router-dom";

function StandingsItem({ i }) {
    return (
      <tr>
        <td>{ i.team.crestUrl ? <img src={i.team.crestUrl} className='country__icon'/> : null}</td>
        <td>{i.team.name}</td>
        <td>{i.playedGames}</td>
        <td>{i.won}</td>
        <td>{i.draw}</td>
        <td>{i.lost}</td>
        <td>{i.points}</td>
      </tr>
    )
}

export default StandingsItem