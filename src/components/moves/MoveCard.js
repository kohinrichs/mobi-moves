import React from "react"
import { useHistory } from "react-router-dom"
import "./Move.css"


export const MoveCard = ({ move }) => {
    
const history = useHistory()

    return (
        <section className="move">
            <h3 className="move__name">{move.name}</h3>
            <button onClick={() => {
                history.push(`/moves/detail/${move.id}`)
            }}>Details</button>
            
            {/* <button onClick={() => {
                //Click Event that does something put doesnt push
                history.push(`/moves/detail/${move.id}`)
            }}>Add to Workout</button> */}
        </section>
    )
}