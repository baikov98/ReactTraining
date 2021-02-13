import React from 'react'
import PropTypes from 'prop-types'
const StandingsOption = ({ value, name }) => {
    return ( <option value={value}>{value}</option> )
}

const StandingsType = ({ types, changeType, type }) => {

    const inputHandle = (e) => {
        let result = types.filter((val) => val.displayName === e.target.value)
        changeType(result[0].num)
    }
    return (
        <>
        <select onChange={inputHandle} value={type.displayName}>
            {types.map((val) => (<StandingsOption value={val.displayName} 
                                                  key={val.num} />))}
        </select>
        </>
    )
}

StandingsType.propTypes = {
    types: PropTypes.arrayOf(PropTypes.object), 
    changeType: PropTypes.func, 
    type: PropTypes.object, 
}

StandingsOption.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
}

export default StandingsType