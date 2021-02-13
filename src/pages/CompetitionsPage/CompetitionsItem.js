import { Link } from "react-router-dom"; 

const availableIDs = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]

function CompetitionsItem({ i }) {
    return (<tr>
                <td>{ i.area.ensignUrl ? <img src={i.area.ensignUrl} className='country__icon'/> : null}</td>
                <td>{i.area.name}</td>
                <td>{availableIDs.includes(i.id) ? 
                                (<Link to={`/${i.id}/teams`}>{i.name}</Link>) : `${i.name}`}</td>
                <td>{availableIDs.includes(i.id) ? 
                                (<Link to={`/${i.id}/calendar`}>Calendar</Link>) : 'Calendar'}</td>
                <td>{availableIDs.includes(i.id) ? 
                                (<Link to={`/${i.id}/standings`}>Standings</Link>) : 'Standings'}</td>
                <td>{i.currentSeason?.startDate || ''}</td>
                <td>{i.currentSeason?.endDate || ''}</td>
            </tr>)
}

export default CompetitionsItem 