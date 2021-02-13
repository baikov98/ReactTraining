function TableItem({ i }) {
    let date = i.lastUpdated
    let dateAndTime = date.slice(8,10)+'.'+date.slice(5,7)+'.'+date.slice(0,4) + ', ' + date.slice(11,16)
    return (
        <tr>
            <td>{i.area.name}</td>
            <td>{i.name}</td>
            <td>{i.plan}</td>
            <td>{dateAndTime}</td>
        </tr>
    )
}

export default TableItem