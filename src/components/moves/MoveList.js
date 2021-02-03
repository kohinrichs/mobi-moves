import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { MoveContext } from "./MoveProvider"
import { MoveCard } from "./MoveCard"
import { BuildAWorkoutForm } from "./BuildAWorkoutForm"
import "./Move.css"


export const MoveList = () => {
  // This state changes when `getMoves()` is invoked below
  const { moves, getMoves } = useContext(MoveContext)

  const history = useHistory()
  const currentUserId = (parseInt(localStorage.getItem("mobi_user")))
  const filteredArray = moves.filter(m => m.userId === currentUserId)

  //useEffect - reach out to the world for something // could maybe filter the moves in the useEffect as well
  useEffect(() => {
    getMoves()
  }, [])

  // Need to return something from MoveCard to Give to Build A Workout Form to add moves to workout 

 const MoveForForm = (move) => {
        console.log("This Works", move)
    }
  
    return (
        <>
            <h1>Excercise Library</h1>

            <button onClick={() => {history.push("/moves/create")}}>
                Add A Move
            </button>

            <div className="moves">
                {
                    filteredArray.map(move => {
                        return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                    })
                }
            </div>

            <div className="buildAWorkoutForm">
                <BuildAWorkoutForm />
            </div>
        </>
    )
}