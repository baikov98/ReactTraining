import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const TeamItem = ({ i }) => {
    let date = i.lastUpdated
    let dateAndTime = date.slice(8,10)+'.'+date.slice(5,7)+'.'+date.slice(0,4) + ', ' + date.slice(11,16)
    let tier = null
    switch (i.plan) {
        case 'TIER_ONE': tier = 1
            break
        case 'TIER_TWO': tier = 2
            break
        case 'TIER_THREE': tier = 3
            break
    }
    return ( 
        <tr>
            <td>{i.area.name}</td>
            <td><Link to={`/${i.id}/teams`}>{i.name}</Link></td>
            <td>{tier}</td>
            <td>{dateAndTime}</td>
        </tr>
    )
}

TeamItem.propTypes = {
    i: PropTypes.object
}

export default TeamItem