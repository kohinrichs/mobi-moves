import React, { useState, createContext } from "react"

//--- The context is imported and used by individual components that need data
export const MoveCombinationContext = createContext()

//--- This component establishes what data can be used.
export const MoveCombinationProvider = (props) => {
    const [moveCombinations, setMoveCombinations] = useState([])

    const getMoveCombinations = () => {
        return fetch("http://localhost:8088/moveCombinations?_expand=workout&_expand=move")
            .then(res => res.json())
            .then(setMoveCombinations)
    }

    const getMoveCombinationById = (id) => {
        return fetch(`http://localhost:8088/moveCombinations/${id}?_expand=workout&_expand=move`)
            .then(res => res.json())
    }

    const addMoveCombination = (mc) => {
        return fetch("http://localhost:8088/moveCombinations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mc)
        })
            .then(response => response.json())
            .then(getMoveCombinations)
    }

    const deleteMoveCombination = mcId => {
        return fetch(`http://localhost:8088/moveCombinations/${mcId}`, {
            method: "DELETE"
        })
            .then(getMoveCombinationById)
    }

    const updateMoveCombination = (mc) => {
        return fetch(`http://localhost:8088/moveCombinations/${mc.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mc)
        })
            .then(getMoveCombinations)
    }

    return (
        <MoveCombinationContext.Provider value={{
            moveCombinations, getMoveCombinations, addMoveCombination, getMoveCombinationById, deleteMoveCombination, updateMoveCombination
        }}>
            {props.children}
        </MoveCombinationContext.Provider>
    )
}
