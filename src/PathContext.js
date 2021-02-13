import React from 'react'

export const PathContext = React.createContext() 

export const PathProvider = ({ children }) => {

    const setQuery = (history, name, data) => {
        const loc = new URLSearchParams(window.location.search)
        if (!loc.has(name)) loc.append(name, data);
        else if (!data) loc.delete(name)
        else loc.set(name, data);
        history.push({search: loc.toString()})
      }
    const deleteQuery = (history, queryArray) => {
        const loc = new URLSearchParams(window.location.search)
        for (let query of queryArray) loc.delete(query)
        history.push({search: loc.toString()})
      }

    return (
        <PathContext.Provider value={{setQuery,
                                      deleteQuery}}>
            {children}
        </PathContext.Provider>
    )
}