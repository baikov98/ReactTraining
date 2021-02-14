import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"; 

const availableIDs = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021]

const CompetitionsItem = ({ i }) => {
    const Icon = <img src={i.area.ensignUrl} className='country__icon'/>
    const NoIcon = <div className='country__icon'/>
    const showLink = (path, name) => availableIDs.includes(i.id) ? 
                                    <Link to={`/${i.id}/${path}`}><small>{name}</small></Link> : '';
    return (
    <tr>
        <td>{ i.area.ensignUrl ? Icon : NoIcon} {i.area.name}</td>
        <td><strong>{i.name}</strong>
            <div>{showLink('calendar', 'Calendar')} &nbsp;
                 {showLink('teams', 'Teams')} &nbsp;
                 {showLink('standings', 'Standings')}</div></td>           
        <td><div className='text-impact'>{i.currentSeason?.startDate || ''}</div></td>
        <td><div className='text-impact'>{i.currentSeason?.endDate || ''}</div></td>
    </tr>
    )
}

CompetitionsItem.propTypes = {
    i: PropTypes.object
}
export default CompetitionsItem 