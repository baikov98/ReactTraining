function TableTemplate({ children, headersArr }) {
    return (<table>
        <thead>
        <tr>
          {headersArr.map((val, i) => (<th key={val+i}>{val}</th>))}
          </tr>
        </thead>
        <tbody>
          {children} 
        </tbody>
      </table>)
}

export default TableTemplate