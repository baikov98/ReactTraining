function TableItem({ i }) {
    return (
        <tr>
            <td>{i.area.name}</td>
            <td>{i.name}</td>
            <td>{i.plan}</td>
            <td>{new Date(i.lastUpdated).toLocaleDateString()}</td>
        </tr>
    )
}

export default TableItem