import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { MoveContext } from "./MoveProvider"
import { MoveCombinationContext } from "../extras/MoveCombinationProvider"
import "./Move.css"

export const MoveDetail = () => {

  const { getMoveById, deleteMove } = useContext(MoveContext)
  const { moveCombinations, getMoveCombinations } = useContext(MoveCombinationContext)
  const history = useHistory();

  //--- Accessing the moveId from the URL
  const { moveId } = useParams();

  //--- Will set the state of move in UseEffect after gettingMoveById with the Id from useParams
  const [move, setMove] = useState({})

  //--- Checks to see if the move is being used in a workout. If being used, give user warning window. If not, uses id to delete the move if Delete button is clicked. Then routes back to /moves.
  const handleDelete = () => {
    if (moveCombinations.find(m => m.moveId === parseInt(moveId))) {
      window.alert("Oh no! You're using this move in a workout. Please remove from the workout(s) before deleting it.")
    } else {
      deleteMove(move.id)
        .then(() => {
          history.push("/moves")
        })
    }
  }

  //--- Reaching out into the world to get the move assocaited with the id from useParams and then set it as state
  useEffect(() => {
    getMoveById(moveId)
      .then((response) => {
        setMove(response)
      })
      .then(getMoveCombinations)
  }, [])

  //--- Using the move state to print the details for the move to the DOM
  return (
    <>
    <div className="buttonContainer">
    <button className="button__back" onClick={() => {
          history.push(`/moves`)
        }}>Back</button>
    </div>
      <div className="moveDetailsCard">
        <div className="moveDetails">
          <h3 className="moveDetails__name">{move.name}</h3>
          <div className="move__description">{move.description}</div>
          <div className="moveDetails__equipment">Equipment: {move.equipment?.name}</div>
          <div className="moveDetails__muscleGroup">Muscle Group: {move.muscleGroup?.name}</div>
          <div className="buttons_container">
            <button className="button__editMove" onClick={() => {
              history.push(`/moves/edit/${move.id}`)
            }}>Edit</button>
            <button className="button__deleteMove" onClick={handleDelete}>DELETE</button>
          </div>
        </div>
      </div>
    </>
  )
}