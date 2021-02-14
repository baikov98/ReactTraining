import React, { useEffect } from 'react'


const useFetchData = (url, lookArr, setFunc) => {
    useEffect(() => {
        fetch(url, {headers: { 'X-Auth-Token': 'e161b5cf73d24b83bad26a7af72478e1' }})
            .then(response => response.json())
            .then(json => setFunc(json))
            .catch(e => setFunc(e))
        }, lookArr)
}

export default useFetchData