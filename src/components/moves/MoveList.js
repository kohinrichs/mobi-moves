import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { MoveContext } from "./MoveProvider"
import { MoveCard } from "./MoveCard"
import { BuildAWorkoutForm } from "./BuildAWorkoutForm"
import { MuscleGroupContext } from "../extras/MuscleGroupProvider"
import "./Move.css"


export const MoveList = () => {
  // This state changes when `getMoves()` is invoked below
  const { moves, getMoves } = useContext(MoveContext)
  const { muscleGroup, getMuscleGroup } = useContext(MuscleGroupContext)

  const history = useHistory()
  const currentUserId = (parseInt(localStorage.getItem("mobi_user")))
  const filteredArray = moves.filter(m => m.userId === currentUserId)

  filteredArray.sort(function(a,b) {
    return a.muscleGroupId - b.muscleGroupId
  })

  const [arrayOfMoves, setArrayOfMoves] = useState([])

  //useEffect - reach out to the world for something // could maybe filter the moves in the useEffect as well
  useEffect(() => {
    getMoves()
  }, [])

  // Need to return something from MoveCard to Give to Build A Workout Form to add moves to workout 
 // Will need to clear the state when the form is submitted
 // Need to take updated state from MoveList and send it to Build a Workout Form as a prop to rerender the list when there 
 // has been an update to the state of newArrayOfMoves
  
    let newArrayOfMoves = [ ...arrayOfMoves ]
    console.log("Test", newArrayOfMoves) 

 const MoveForForm = (move) => {
        
        console.log("This Works", move)
        
        newArrayOfMoves.push(move)
        setArrayOfMoves(newArrayOfMoves)

        console.log(newArrayOfMoves)    
    }

    // let equipmentListForPrint = equipment.filter(e => uniqueEquipmentList.includes(e.id)).map(e => e.name)
    // console.log(equipmentListForPrint)
    return (
        <>
            <h1>Excercise Library</h1>

            <button onClick={() => {history.push("/moves/create")}}>
                Add A Move
            </button>

            {/* <div className="moves">
                {  
                    muscleGroup.filter(mg => filteredArray.includes(mg.id)).map(move => {
                        return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                    })
                }
            </div> */}
            <div className="movesView">
                <div className="moves">
                    {
                        filteredArray.map(move => {
                            return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                        })
                    }
                </div>

                <div className="buildAWorkoutForm">
                    {
                        <BuildAWorkoutForm key={newArrayOfMoves} newArrayOfMoves={newArrayOfMoves} />
                    }
                </div>
            </div>
        </>
    )
}