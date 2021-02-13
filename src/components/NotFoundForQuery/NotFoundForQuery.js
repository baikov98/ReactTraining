import React from 'react'

const NotFoundForQuery = ({ queryArray }) => {
    const filtered = queryArray.filter((val) => val.desc)
    const queries = filtered.map((val) => {
        return `${val.name} - ${val.desc}`
    })
    return (
        <>
        <p>Not found for: {queries.join(', ')} </p>
        </>
    )
}

export default NotFoundForQuery