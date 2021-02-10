function TableTemplate({ children, headersArr }) {
    return (<table>
        <thead>
        <tr>
          {headersArr.map((val, i) => (<th key={i}>{val}</th>))}
          </tr>
        </thead>
        <tbody>
          {children} 
        </tbody>
      </table>)
}

export default TableTemplate