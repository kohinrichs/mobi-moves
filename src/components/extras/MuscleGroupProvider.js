import React, { useState, createContext } from "react"

//--- The context is imported and used by individual components that need data
export const MuscleGroupContext = createContext()

//--- This component establishes what data can be used.
export const MuscleGroupProvider = (props) => {
    const [muscleGroup, setMuscleGroup] = useState([])

    const getMuscleGroup = () => {
        return fetch("http://localhost:8088/muscleGroups")
            .then(res => res.json())
            .then(setMuscleGroup)
    }

    return (
        <MuscleGroupContext.Provider value={{
            muscleGroup, getMuscleGroup
        }}>
            {props.children}
        </MuscleGroupContext.Provider>
    )
}