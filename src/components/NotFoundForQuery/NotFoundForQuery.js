import React from 'react'

const NotFoundForQuery = ({ queryArray }) => {
    const filtered = queryArray.filter((val) => val.desc)
    const queries = filtered.map((val) => {
        return `${val.name} - ${val.desc}`
    })
    return (
        <p><strong>Not found for:</strong> {queries.join(', ')} </p>
    )
}

export default NotFoundForQuery