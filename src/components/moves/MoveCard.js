import React from "react"
import { useHistory } from "react-router-dom"
import "./Move.css"

//--- The MoveCard receive two props - move and the callback function handleClick. move is used to fill in the card information for the DOM.
// If the details button is clicked, the user is routed to the deails for that move. If the Add to Workout button is clicked, handleClick is called with an argument of move.

export const MoveCard = ({ move, handleClick }) => {

    const history = useHistory()

    return (
        <section className="move">
            <h3 className="move__name">{move.name}</h3>
            <button className="button__details" onClick={() => {
                history.push(`/moves/detail/${move.id}`)
            }}>Details</button>

            <button className="button__addToWorkout" onClick={() => { handleClick(move) }}>Add to Workout</button>

        </section>
    )
}