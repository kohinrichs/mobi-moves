import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { MoveContext } from "./MoveProvider"
import "./Move.css"

export const MoveDetail = () => {

  const { getMoveById, deleteMove } = useContext(MoveContext)
  const history = useHistory();

  //--- Accessing the moveId from the URL
  const { moveId } = useParams();

  //--- Will set the state of move in UseEffect after gettingMoveById with the Id from useParams
  const [move, setMove] = useState({})

  //--- Uses id to delete the move if Delete button is clicked. Then routes back to /moves.
  const handleDelete = () => {
    deleteMove(move.id)
      .then(() => {
        history.push("/moves")
      })
  }

  //--- Reaching out into the world to get the move assocaited with the id from useParams and then set it as state
  useEffect(() => {
    getMoveById(moveId)
      .then((response) => {
        setMove(response)
      })
  }, [])

  //--- Using the move state to print the details for the move to the DOM
  return (
    <>
      <button onClick={() => {
        history.push(`/moves`)
      }}>Back</button>
      <section className="move">
        <h3 className="move__name">{move.name}</h3>
        <div className="move__description">{move.description}</div>
        <div className="move__equipment">Equipment: {move.equipment?.name}</div>
        <div className="move__muscleGroup">Muscle Group: {move.muscleGroup?.name}</div>
        <button onClick={handleDelete}>DELETE</button>
      </section>
    </>
  )
}