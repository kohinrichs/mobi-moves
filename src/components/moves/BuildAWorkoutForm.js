import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { EquipmentContext } from "../extras/EquipmentProvider"
import { MoveCombinationContext } from "../extras/MoveCombinationProvider"
import { WorkoutContext } from "../workouts/WorkoutProvider"
import "./Move.css"

//--- BuildAWorkoutForm receives arrayOfMoves and workout as props from MoveList
export const BuildAWorkoutForm = ({ arrayOfMoves, workout, handleRemoveMove }) => {
    const { addMoveCombination } = useContext(MoveCombinationContext)
    const { workouts, getWorkouts, addWorkout } = useContext(WorkoutContext)
    const { getEquipment } = useContext(EquipmentContext)

    const currentUserId = (parseInt(localStorage.getItem("mobi_user")))
    const history = useHistory();

    //--- Defining initial state for moveCombinations
    const [moveCombinations, setMoveCombinations] = useState([]);

    //--- Using the spread operator to create copies of moveCombinations and arrayOfMoves
    const newMoveCombinations = [...moveCombinations]
    const movesForWorkout = [...arrayOfMoves]

    // --- Equipment List: To display the equipment list as the workout is being built, I mapped over the movesForWorkout array to get the names of the 
    // equipment associated with the selected moves.
    let equipmentList = movesForWorkout.map(e => e.equipment.name)

    //--- Then used the spread opterator to create a copy of the equipmentList
    let uniqueEquipmentList = [...new Set(equipmentList)]

    //--- Then removed "No equipment" from the array if it occured.
    uniqueEquipmentList = uniqueEquipmentList.filter(e => e !== "No equipment")

    // ---Reached out in tothe world to get equipment
    useEffect(() => {
        getEquipment()
            .then(getWorkouts)
    }, [])

    //--- This function is called when a workout is saved and handles saving the workout to the datatbase.
    const handleClickSaveWorkout = (event) => {
        
        //--- Prevents the browser from submitting the form
        event.preventDefault()

        //--- Counter for positionInTheWorkout
        let positionInWorkoutKey = 1

        //--- When the saved button is clicked, this maps over the moves in the movesForWorkout array and makes a newMoveCombo object. The object is pushed into
        // the newMoveCombinations array, and then the newMovesCombinations array is used to set the state of MoveCombinations
        movesForWorkout.map(move => {
            let newMoveCombo = {
                moveId: move.id,
                workoutId: 0,
                positionInWorkout: 0,
                id: 0
            }
            newMoveCombinations.push(newMoveCombo)
            setMoveCombinations(newMoveCombinations)
        })
        //--- Checking to be sure there is information entered for the workout name and and interval and set selected. If not, a window pops up asking the user to 
        // enter the correct information. Also checks the workout names associated with the user to avoid duplicates. Once all the information has been entered, the addWorkout is called with an object created from the data the user entered 
        // in the form as an argument. The workout portion of the workout is added to the database.
        const intervalId = workout.intervalId
        const setId = workout.setId

        if (intervalId === 0 || setId === 0 || workout.name === "") {
            window.alert("Please select a name, interval, and number of sets and a few moves!")
        } else if (workouts.filter(w => w.userId === currentUserId).find(w => w.name === workout.name)) {
            window.alert("Oh no! You already have a workout with this name. Please use a different name.")
        } else {
            addWorkout({
                name: workout.name,
                intervalId: workout.intervalId,
                setId: workout.setId,
                userId: parseInt(localStorage.getItem("mobi_user")),
            })

                //--- Then we need to save the moveCombinations associated with the workout to the database. addWorkout returns the workout object we just saved, so
                // we take the newWorkout object as a parameter in the annonymous .then function. Promise.all takes an array of promises (which we're creating when mapping over
                // all the newMoveCombinations and calling addMoveCombination on each object)and returns a promise. We map over the newMoveCombinations array and feed one obeject 
                // from it at a time into addMoveCombination (which is what is creating all the promises). Within addMoveCombination, we use the spread operator to create a copy of 
                // move and add the workoutId and positionInWorkoutKey to it.

                .then((newWorkout) => Promise.all(newMoveCombinations.map(move => addMoveCombination({ ...move, workoutId: newWorkout.id, positionInWorkout: positionInWorkoutKey++ }))))
                .then(() => history.push("/workouts"))
        }
    }

    //--- In the return, we're mapping over the movesForWorkout array to get the names of the moves in the array. There is also a Save button and the equipment list. The 
    // equipment list uses a ternary statement to either print the equipment in the uniqueEquipmentList or if the array is empty, it prints "No Equipment Needed".
    return (
        <div className="buildAWorkoutForm__moves">
            <ul className="list-group">
                {movesForWorkout.map(move => (
                    <li key={move.name}>{move.name} <button onClick={() => { handleRemoveMove(move) }}>X</button></li>
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