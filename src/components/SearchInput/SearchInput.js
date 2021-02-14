import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";
import { PathContext } from '../../PathContext'

const SearchInput = ({ setQueryString, queryString }) => {
    const { setQuery } = useContext(PathContext)
    const history = useHistory()
    
    const inputHandle = (e) => {
        setQuery(history, 'query', e.target.value)
        setQueryString(e.target.value || '')
    }
    const style = {
        width: '180px'
    }
    return (
        <input type="text" className='form-control mr-2 mb-2' style={style}
                             placeholder='Search...'
                             onChange={inputHandle} 
                             value={queryString} />
    )
}

SearchInput.propTypes = {
    setQueryString: PropTypes.func, 
    queryString: PropTypes.string
}

export default SearchInput
