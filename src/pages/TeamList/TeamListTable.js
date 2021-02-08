import { Link } from "react-router-dom";
import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'

function ItemTeam({ i }) {
    return (
      <tr>
        <td>{ i.crestUrl ? <img src={i.crestUrl} className='country__icon'/> : null}</td>
        <td>{i.area.name}</td>
        <td><Link to={`/teams/${i.id}`}>{i.name}</Link></td>
        <td>{i.website}</td>
      </tr>
    )
}

function TeamsTable({ children }) {
    return (<table>
        <thead>
        <tr>
          <th>icon</th>
          <th>Region</th>
          <th>Team Name</th>
          <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {children} 
        </tbody>
      </table>)
}

export default function TeamListTable({ teamsArr, year }) {
    const query = new URLSearchParams(window.location.search).get('query') || '';
    const FilteredTeams = teamsArr.filter((val, i) => {
        if (query === '') return val;
        if (val.name.toLowerCase().includes(query.toLowerCase())) return val })
    return (
        <>
        {FilteredTeams.length ? (<TeamsTable>
        {FilteredTeams.map((i, index) => (<ItemTeam key={index} i={i}/>))}
        </TeamsTable>) : <NotFoundForQuery queryArray={[{name: 'search query', 
                                                          desc: query}, 
                                                          {name: 'year',
                                                          desc: year}]} />}
        </>
    )
}