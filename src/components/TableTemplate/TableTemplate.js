import React from 'react'
import PropTypes from 'prop-types'

const TableTemplate = ({ children, headersArr }) => {
    return (<table className='table table-striped table-bordered table-hover table-sm'>
              <thead className='thead-dark'>
              <tr>
                {headersArr.map((val, i) => (<th key={val+i}>{val}</th>))}
                </tr>
              </thead>
              <tbody className=''>
                {children} 
              </tbody>
            </table>)
}

TableTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object), 
  headersArr: PropTypes.arrayOf(PropTypes.string)
}

export default TableTemplate