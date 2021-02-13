import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const TeamItem = ({ i }) => {
    let date = i.lastUpdated
    let dateAndTime = date.slice(8,10)+'.'+date.slice(5,7)+'.'+date.slice(0,4) + ', ' + date.slice(11,16)
    return ( 
        <tr>
            <td>{i.area.name}</td>
            <td><Link to={`/${i.id}/teams`}>{i.name}</Link></td>
            <td>{i.plan}</td>
            <td>{dateAndTime}</td>
        </tr>
    )
}

TeamItem.propTypes = {
    i: PropTypes.object
}

export default TeamItem