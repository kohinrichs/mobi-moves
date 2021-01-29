import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const EquipmentContext = createContext()

// This component establishes what data can be used.
export const EquipmentProvider = (props) => {
    const [equipment, setEquipment] = useState([])

    const getEquipment = () => {
        return fetch("http://localhost:8088/equipment")
        .then(res => res.json())
        .then(setEquipment)
    }

    return (
        <EquipmentContext.Provider value={{
            equipment, getEquipment
        }}>
            {props.children}
        </EquipmentContext.Provider>
    )
}
