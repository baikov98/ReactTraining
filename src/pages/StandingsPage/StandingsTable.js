import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'
import StandingsItem from './StandingsItem'
import TableTemplate from '../../components/TableTemplate/TableTemplate'

const headersArr = [' ', 'Team', 'PG', 'W', 'D', 'L', 'P']

function StandingsTable({ standingsArr }) {
    const query = new URLSearchParams(window.location.search).get('query') || '';
    const FilteredTeams = standingsArr.filter((val, i) => {
        if (query === '') return val;
        if (val.team.name.toLowerCase().includes(query.toLowerCase())) return val })
    return (
        <>
        {FilteredTeams.length ? (<TableTemplate headersArr={headersArr}>
            {FilteredTeams.map((i) => (<StandingsItem key={i.team.id} i={i}/>))}
            </TableTemplate>) : <NotFoundForQuery queryArray={[{name: 'search query', 
                                                                desc: query}, ]} />}
            </>
    )
}

export default StandingsTable