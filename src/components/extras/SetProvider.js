import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const SetContext = createContext()

// This component establishes what data can be used.
export const SetProvider = (props) => {
    const [set, setSet] = useState([])

    const getSet = () => {
        return fetch("http://localhost:8088/sets")
        .then(res => res.json())
        .then(setSet)
    }

    return (
        <SetContext.Provider value={{
            set, getSet
        }}>
            {props.children}
        </SetContext.Provider>
    )
}