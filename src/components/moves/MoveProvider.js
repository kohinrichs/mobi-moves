import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need this data
export const MoveContext = createContext()

// This component establishes what data can be used.
export const MoveProvider = (props) => {
    const [moves, setMoves] = useState([])

    const getMoves = () => {
        return fetch("http://localhost:8088/moves?_expand=equipment&_expand=muscleGroup")
        .then(res => res.json())
        .then(setMoves)
    }

    const getMoveById = (id) => {
        return fetch(`http://localhost:8088/moves/${id}?_expand=equipment&_expand=muscleGroup`)
            .then(res => res.json())
    }

    const addMove = (move) => {
        return fetch("http://localhost:8088/moves", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(move)
        })
        .then(response => response.json())
        .then(getMoves)
    }

    const deleteMove = moveId => {
        return fetch(`http://localhost:8088/moves/${moveId}`, {
            method: "DELETE"
        })
            .then(getMoves)
    }

    const updateMove = (move) => {
        return fetch(`http://localhost:8088/moves/${move.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(move)
        })
          .then(getMoves)
      }

    return (
        <MoveContext.Provider value={{
            moves, getMoves, addMove, getMoveById, deleteMove, updateMove
        }}>
            {props.children}
        </MoveContext.Provider>
    )
}
