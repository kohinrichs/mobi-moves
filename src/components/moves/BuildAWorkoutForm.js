// Needs to have a textarea for the name of the workout, two selects for sets and intervals, then you need to be able to add moves from the
// library to the "list" portion. (3 groups of 4) Will then need an affordance to save

import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { IntervalContext } from "../extras/IntervalProvider"
import { SetContext } from "../extras/SetProvider"
import { WorkoutContext } from "../workouts/WorkoutProvider"
import { MoveCombinationContext } from "../extras/MoveCombinationProvider"
import { MoveContext } from "./MoveProvider"
import "./Move.css"


export const BuildAWorkoutForm = ({ newArrayOfMoves }) => {
    const { addMoveCombination } = useContext(MoveCombinationContext)
    const { addWorkout } = useContext(WorkoutContext)
    const { interval, getInterval } = useContext(IntervalContext)
    const { set, getSet } = useContext(SetContext)
    const { moves, getMoves } = useContext(MoveContext)

    const history = useHistory();

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the intial state of the form inputs with useState()
    */

    const [workout, setWorkout] = useState({
        name: "",
        intervalId: 0,
        setId: 0,
        userId: parseInt(localStorage.getItem("mobi_user")),
        id: 0
    });

    const [moveCombinations, setMoveCombinations] = useState([]);

    const newMoveCombinations = [ ...moveCombinations ]

    const movesForWorkout = [...newArrayOfMoves]
    console.log("moves for workout", movesForWorkout)

    // let newMoveCombinations = { ...moveCombinations }
    // let arrayOfNewMoveCombinations = []

    /*
    Reach out to the world and get interval state
    and sets state on initialization, so we can provide their data in the form dropdowns
    */
    useEffect(() => {
        getInterval()
            .then(getSet)
            .then(getMoves)
    }, [])


    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component

    const handleControlledInputChange = (event) => {

        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/

        const newWorkout = { ...workout }

        let selectedVal = event.target.value

        // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids

        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        /* Move is an object with properties. Set the property to the new value using object bracket notation. */
        
        if (event.target.id !== "moveId") {
            newWorkout[event.target.id] = selectedVal
        }

         // update state
         setWorkout(newWorkout)

        //Managing state of moveCombinations > updating as a new move is added to the list
        // When a new object is add to the movesForWorkout array -  Need to map through the array 
        // to use the moveId from all the moves to add as the move Id 
        // to an array of newMoveCombination objects

        // movesForWorkout.map(move => {
        //     let newMove = {
        //         moveId: move,
        //         workoutId: 0,
        //         positionInWorkout: 0,
        //         id: 0
        //     }
        //     newMoveCombinations.push(newMove)
        // })
        
        // console.log("are moves adding", setMoveCombinations(newMoveCombinations))
        

        // If a new move is added to the movesForWorkout Array, make a new object and update the sate of 
        // newMoveCombinations

        // newMoveCombinations = movesForWorkout.map(move => {
        //     newMoveCombination.moveId = move.id })

    

        //   // TO DO? - need to set the workout state again with the new update?
        //   setMoveCombinations(newMoveCombinations)
    }

    // When the save button is clicked, need to take all of the ids from the objects in moves for workout,
    // and make objects with those Ids in the newMoveCombinations array. Then need to update that array of 
    // objects during the save process.

    const handleClickSaveWorkout = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        const intervalId = workout.intervalId
        const setId = workout.setId

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
        
        if (intervalId === 0 || setId === 0) {
            window.alert("Please select an interval and number of sets")
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
        .then((newWorkout) => Promise.all(newMoveCombinations.map(move => addMoveCombination({...move, workoutId: newWorkout.id}))))
        .then(()=> history.push("/workouts"))
        }
    }
  
    return (
        <div className="buildAWorkoutForm">
            <form className="workoutForm">
                <h2 className="workoutForm__title">Build A Workout</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Workout Name:</label>
                        <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name your workout." value={workout.name} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="interval">What's the time interval?</label>
                        <select defaultValue={workout.intervalId} name="intervalId" id="intervalId" onChange={handleControlledInputChange} className="form-control" >
                            <option value="0">Select your interval</option>
                            {interval.map(i => (
                                <option key={i.id} value={i.id}>
                                    {i.intervalTime}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="setId">How many times will you complete each series? </label>
                        <select defaultValue={workout.setId} name="setId" id="setId" onChange={handleControlledInputChange} className="form-control" >
                            <option value="0">Select the number of sets</option>
                            {set.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.numberOfSets}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <ul className="list-group">
                    {movesForWorkout.map(move => (
                        <li>{move.name}</li>
                    ))}
                </ul>
                <button className="btn btn-primary"
                onClick={handleClickSaveWorkout}>
                Save
          </button>
            </form>
        </div>
    )
}
