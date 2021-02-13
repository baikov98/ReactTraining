

function StandingsOption({ value, name }) {
    return ( <option value={value}>{value}</option> )
}

function StandingsType({ types, changeType, type }) {

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

export default StandingsType