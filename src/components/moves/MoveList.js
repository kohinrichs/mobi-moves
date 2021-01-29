import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { MoveContext } from "./MoveProvider"
import { MoveCard } from "./MoveCard"
import "./Move.css"

export const MoveList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { moves, getMoves } = useContext(MoveContext)

  const history = useHistory()
  const currentUserId = (parseInt(localStorage.getItem("mobi_user")))
  const filteredArray = moves.filter(m => m.userId === currentUserId)

  //useEffect - reach out to the world for something
  useEffect(() => {
    getMoves()
  }, [])


    return (
        <>
            <h1>Move Library</h1>

            <button onClick={() => {history.push("/moves/create")}}>
                Add A Move
            </button>

            <div className="moves">
                {
                    filteredArray.map(move => {
                        return <MoveCard key={move.id} move={move} />
                    })
                }
            </div>
        </>
    )

    
}