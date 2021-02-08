// Needs to have a textarea for the name of the workout, two selects for sets and intervals, then you need to be able to add moves from the
// library to the "list" portion. (3 groups of 4) Will then need an affordance to save

import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { WorkoutContext } from "../workouts/WorkoutProvider"
import { MoveCombinationContext } from "../extras/MoveCombinationProvider"
import { EquipmentContext } from "../extras/EquipmentProvider";
import "./Move.css"



export const BuildAWorkoutForm = ({ newArrayOfMoves, workout }) => {
    const { addMoveCombination } = useContext(MoveCombinationContext)
    const { addWorkout } = useContext(WorkoutContext)
    const { getEquipment } = useContext(EquipmentContext)

    const history = useHistory();

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the intial state of the form inputs with useState()
    */
   
    const [moveCombinations, setMoveCombinations] = useState([]);

    const newMoveCombinations = [ ...moveCombinations ]

    const movesForWorkout = [...newArrayOfMoves]
    console.log("moves for workout", movesForWorkout)

// ----

let equipmentList = movesForWorkout.map(e => e.equipment.name)
console.log(equipmentList)

let uniqueEquipmentList = [...new Set(equipmentList)]
console.log(uniqueEquipmentList)

uniqueEquipmentList = uniqueEquipmentList.filter(e => e !== 6)

// let equipmentListForPrint = equipment.filter(e => uniqueEquipmentList.includes(e.id)).map(e => e.name)
// console.log(equipmentListForPrint)

//-------

    /*
    Reach out to the world and get interval state
    and sets state on initialization, so we can provide their data in the form dropdowns
    */

    useEffect(() => {
        getEquipment()
    }, [])


    // When the save button is clicked, need to take all of the ids from the objects in moves for workout,
    // and make objects with those Ids in the newMoveCombinations array. Then need to update that array of 
    // objects during the save process.

    const handleClickSaveWorkout = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        const intervalId = workout.intervalId
        const setId = workout.setId
        
        let positionInWorkoutKey = 1
        
        movesForWorkout.map(move => {
            let newMove = {
                moveId: move.id,
                workoutId: 0,
                positionInWorkout: 0,
                id: 0
            }
            newMoveCombinations.push(newMove)
            setMoveCombinations(newMoveCombinations)
        })
        
        if (intervalId === 0 || setId === 0 || workout.name === "") {
            window.alert("Please select a name, interval, and number of sets")
        } else {

            addWorkout({
                name: workout.name,
                intervalId: workout.intervalId,
                setId: workout.setId,
                userId: parseInt(localStorage.getItem("mobi_user")),
            })

        // Here we are taking the newWorkout object as a parameter in the annonymous .then function. Promise.all takes an array of promises 
        // and returns a promise. We're then mapping over the newMoveCombinations array and feeding one obeject from it at a time into addMoveCombination
        //(which is what is creating all the promises). Within addMoveCombination, we're creating a copy of move and adding te workoutId to it.
        
        .then((newWorkout) => Promise.all(newMoveCombinations.map(move => addMoveCombination({...move, workoutId: newWorkout.id, positionInWorkout: positionInWorkoutKey++ }))))
        .then(()=> history.push("/workouts"))
        }
    }
  
    return (
        <div className="buildAWorkoutForm__moves">
        
                <h2 className="workoutForm__title">Build A Workout</h2>
                <ul className="list-group">
                    {movesForWorkout.map(move => (
                        <li key={move.name}>{move.name}</li>
                    ))}
                </ul>
            <button className="btn btn-primary"
                onClick={handleClickSaveWorkout}>
                Save
          </button>
          <div className="workout__equipmentList">
                <h3 className="workout__equipmentList--name">Equipment List:</h3>
                <div>
                {
                   uniqueEquipmentList.length ? uniqueEquipmentList.map(equipment => equipment).join(", ") : "No Equipment Needed"
                }
                </div>
            </div>
        </div>
    )
}