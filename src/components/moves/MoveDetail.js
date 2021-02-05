import React, { useContext, useEffect, useState } from "react"
import { MoveContext } from "./MoveProvider"
import "./Move.css"
import { useParams, useHistory } from "react-router-dom"

export const MoveDetail = () => {
  
  const { getMoveById, deleteMove } = useContext(MoveContext)

	const [move, setMove] = useState({})

	const {moveId} = useParams();
  const history = useHistory();
  
  const handleDelete = () => {
    deleteMove(move.id)
      .then(() => {
        history.push("/moves")
      })
  }

  useEffect(() => {
    getMoveById(moveId)
    .then((response) => {
      setMove(response)
    })
    }, [])

  return (
    <section className="move">
      <h3 className="move__name">{move.name}</h3>
      <div className="move__description">{move.description}</div>
      <div className="move__equipment">Equipment: {move.equipment?.name}</div>
      <div className="move__muscleGroup">Muscle Group: {move.muscleGroup?.name}</div>
      <button onClick={handleDelete}>DELETE</button>
    </section>
  )
}