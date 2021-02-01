// Needs to have a textarea for the name of the workout, two selects for sets and intervals, then you need to be able to add moves from the
// library to the "list" portion. (3 groups of 4) Will then need an affordance to save

// Edit: to fill form fields with element data, you need pass component data as props.
// <Form data={this.state.data}/>

//Upon saving the form, will need to map through the list and create a new moveCombo object for eact move


// Upon Save, the top half of the form will be saved in the workouts database, and the moves will all be added to
// database as new objects in the moveCombos

import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { IntervalContext } from "../extras/IntervalProvider"
import { SetContext } from "../extras/SetProvider"
import { WorkoutContext } from "../workouts/WorkoutProvider"
import { MoveCombinationContext } from "../extras/MoveCombinationProvider"
import { MoveContext } from "./MoveProvider"
import "./Move.css"


export const BuildAWorkoutForm = () => {
    const { addMoveCombination } = useContext(MoveCombinationContext)
    const { addWorkout } = useContext(WorkoutContext)
    const { interval, getInterval } = useContext(IntervalContext)
    const { set, getSet } = useContext(SetContext)
    const { moves, getMoves} = useContext(MoveContext)

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

    const [moveCombinations, setMoveCombinations] = useState({
        moveId: 0,
        workoutId: parseInt(workout.id),
        positionInWorkout: 0,
        id: 0
      });

    const history = useHistory();

    /*
    Reach out to the world and get customers state
    and locations state on initialization, so we can provide their data in the form dropdowns
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
      const newMoveCombinations = { ...moveCombinations }

      let selectedVal = event.target.value
      // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids
      if (event.target.id.includes("Id")) {
        selectedVal = parseInt(selectedVal)
      }
      /* Move is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newWorkout[event.target.id] = selectedVal

      // Need to add some sort of logic so that the save function isn't adding new key/value pairs on to move/combos
      
      if (event.target.id !== "name" && event.target.id !== "intervalId" && event.target.id !== "setId") {
        newMoveCombinations[event.target.id] = selectedVal
      }

      // update state
      setWorkout(newWorkout)
      // need to set the workout state again with the new update?
      setMoveCombinations(newMoveCombinations)
    }

    const handleClickSaveMove = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form

      const intervalId = workout.intervalId
      const setId = workout.setId

      const movesId = moveCombinations.movesId

      if (intervalId === 0 || setId === 0) {
        window.alert("Please select an interval and number of sets")
      } else {
        //invoke addMove passing move as an argument.
        //once complete, change the url and display the move list
        debugger

        // After saving, filter through all the moves combinations with an Id of 0 and save them with the most recent saved workout.

        addWorkout(workout)
        .then(setWorkout(workout))
        .then(moveCombinations.workoutId = workout.id)
        .then(setMoveCombinations(moveCombinations))
        .then(addMoveCombination(moveCombinations))
            // Need to update move combinations somewhere in here with the workoutId, reassign the value?
        // .then(moveCombinations => 
        //     {addMoveCombination(moveCombinations)})
        .then(() => history.push("/workouts"))

        console.log("moveCombos", moveCombinations)
      }
    }

    // This is erasing the rest of the new combo object and replacing it with justthe Id
    // addWorkout(workout)
    // .then(setWorkout(workout))
    // .then(moveCombinations.workoutId = workout.id)
    //     // Need to update move combinations somewhere in here with the workoutId, reassign the value?
    // .then(moveCombinations => 
    //     {addMoveCombination(moveCombinations)})
    // .then(() => history.push("/workouts"))

    return (
      <form className="buildAWorkoutForm">
          <h2 className="moveForm__title">Build A Workout</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Workout Name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name your workout." value={workout.name}/>
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
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Excercise:</label>
                  <input type="text" id="moveId" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Add A Move" value={moves.id}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={handleClickSaveMove}>
            Save
          </button>
      </form>
    )
}