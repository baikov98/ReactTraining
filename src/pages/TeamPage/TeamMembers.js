import React from 'react'
import PropTypes from 'prop-types'
import TableTemplate from '../../components/TableTemplate/TableTemplate'
import { Link } from "react-router-dom";

const TeamMember = ({ i }) => {
    let age = Math.trunc((new Date() - new Date(i.dateOfBirth)) / 31536000000)
    return (
        <tr>
            <td><Link to={`/player/${i.id}`}>{i.name}</Link></td>
            <td>{i.position || i.role}</td>
            <td>{i.countryOfBirth}</td>
            <td>{age}</td>
        </tr>
    )
}
const headersArr = ['Name', 'Position', 'Birth country', 'Age']

const TeamMembers = ({ squad }) => {
    const uniqueArray = squad.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return index === squad.findIndex(obj => {
          return JSON.stringify(obj) === _thing;
        });
    });
    return (
        <>
        {squad ? <TableTemplate headersArr={headersArr}>
            {uniqueArray.map((i) => (<TeamMember i={i} key={i.id} />))}
        </TableTemplate> : <></>}
        </>
    )
}

TeamMember.propTypes = {
    i: PropTypes.object
}

TeamMembers.propTypes = {
    squad: PropTypes.arrayOf(PropTypes.object)
}

export default TeamMembers