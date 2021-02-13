import React from 'react'
import PropTypes from 'prop-types'

const ShowError = ({ error }) => {
    return (
        <>
            <h2>Error: {error.name}</h2>
            <p>{error.message}</p>
            {error.message === 'Failed to fetch' ? 
                <p>Sorry, you have exceeded the request limit</p> : <></>}
        </>
    )
}

ShowError.propTypes = {
    error: PropTypes.object
}

export default ShowError
