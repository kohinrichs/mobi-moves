import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const IntervalContext = createContext()

// This component establishes what data can be used.
export const IntervalProvider = (props) => {
    const [interval, setInterval] = useState([])

    const getInterval = () => {
        return fetch("http://localhost:8088/intervals")
        .then(res => res.json())
        .then(setInterval)
    }

    return (
        <IntervalContext.Provider value={{
            interval, getInterval
        }}>
            {props.children}
        </IntervalContext.Provider>
    )
}