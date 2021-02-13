import NotFoundForQuery from '../../components/NotFoundForQuery/NotFoundForQuery'
import TeamListItem from './TeamListItem'
import TableTemplate from '../../components/TableTemplate/TableTemplate'

const headersArr = [' ', 'Region', 'Team', 'Venue']

function TeamListTable({ teamsArr, year }) {
    const query = new URLSearchParams(window.location.search).get('query') || '';
    const FilteredTeams = teamsArr.filter((val, i) => {
        if (query === '') return val;
        if (val.name.toLowerCase().includes(query.toLowerCase())) return val })
    return (
        <>
        {FilteredTeams.length ? (<TableTemplate headersArr={headersArr}>
            {FilteredTeams.map((i) => (<TeamListItem key={i.id} i={i}/>))}
            </TableTemplate>) : <NotFoundForQuery queryArray={[{name: 'search query', 
                                                            desc: query}, 
                                                            {name: 'year',
                                                            desc: year}]} />}
            </>
    )
}

export default TeamListTable