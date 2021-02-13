import { Link } from "react-router-dom";

function TableItem({ i }) {
    return (
      <tr>
        <td>{ i.crestUrl ? <img src={i.crestUrl} className='country__icon'/> : null}</td>
        <td>{i.area.name}</td>
        <td><Link to={`/teams/${i.id}`}>{i.shortName}</Link></td>
        <td>{i.venue}</td>
      </tr>
    )
}

export default TableItem