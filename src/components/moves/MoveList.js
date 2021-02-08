import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { MoveContext } from "./MoveProvider"
import { MoveCard } from "./MoveCard"
import { BuildAWorkoutForm } from "./BuildAWorkoutForm"
import { MuscleGroupContext } from "../extras/MuscleGroupProvider"

//----
import { IntervalContext } from "../extras/IntervalProvider"
import { SetContext } from "../extras/SetProvider"
//----

import "./Move.css"


export const MoveList = () => {
    // This state changes when `getMoves()` is invoked below
    const { moves, getMoves } = useContext(MoveContext)
    const { muscleGroup, getMuscleGroup } = useContext(MuscleGroupContext)

    //---
    const { interval, getInterval } = useContext(IntervalContext)
    const { set, getSet } = useContext(SetContext)
    //----

    const history = useHistory()
    const currentUserId = (parseInt(localStorage.getItem("mobi_user")))
    const filteredArray = moves.filter(m => m.userId === currentUserId)

    filteredArray.sort(function (a, b) {
        return a.muscleGroupId - b.muscleGroupId
    })

    const [arrayOfMoves, setArrayOfMoves] = useState([])

    const [workout, setWorkout] = useState({
        name: "",
        intervalId: 0,
        setId: 0,
        userId: parseInt(localStorage.getItem("mobi_user")),
        id: 0
    });

    //useEffect - reach out to the world for something // could maybe filter the moves in the useEffect as well
    useEffect(() => {
        getMoves()
            .then(getSet)
            .then(getInterval)
    }, [])

    // Need to return something from MoveCard to Give to Build A Workout Form to add moves to workout 
    // Will need to clear the state when the form is submitted
    // Need to take updated state from MoveList and send it to Build a Workout Form as a prop to rerender the list when there 
    // has been an update to the state of newArrayOfMoves

    let newArrayOfMoves = [...arrayOfMoves]
    console.log("Test", newArrayOfMoves)

    const MoveForForm = (move) => {

        console.log("This Works", move)

        newArrayOfMoves.push(move)
        setArrayOfMoves(newArrayOfMoves)

        console.log(newArrayOfMoves)
    }

    // In order to avoid the form selections clearing upon re-render when a new workout is added, I moved that portion of the form to the MoveList so the state
    // could be managed by a higher lever and persist as new moves are added to the workout.
    // when a field changes, update state. The return will re-render and display based on the values in state

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
    }
    
    return (
        <>
            <h1>Excercise Library</h1>

            <button onClick={() => { history.push("/moves/create") }}>
                Add A Move
            </button>

            <div className="movesView">
                <div>
                    <h3>Arms</h3>
                    <div className="moves--arms">
                        {
                            filteredArray.filter(mg => mg.id === 1).map(move => {
                                return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                            })
                        }
                    </div>
                </div>

                <div>
                    <h3>Legs</h3>
                    <div className="moves--arms">
                        {
                            filteredArray.filter(mg => mg.id === 2).map(move => {
                                return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                            })
                        }
                    </div>
                </div>

                <div>
                    <h3>Full Body</h3>
                    <div className="moves--arms">
                        {
                            filteredArray.filter(mg => mg.id === 3).map(move => {
                                return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                            })
                        }
                    </div>
                </div>

                <div>
                    <h3>Core</h3>
                    <div className="moves--arms">
                        {
                            filteredArray.filter(mg => mg.id === 4).map(move => {
                                return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                            })
                        }
                    </div>
                </div>

                <div>
                    <h3>Cardio</h3>
                    <div className="moves--arms">
                        {
                            filteredArray.filter(mg => mg.id === 5).map(move => {
                                return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                            })
                        }
                    </div>
                </div>
            </div>

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

                    <div className="workout__moves">
                        {

                            <BuildAWorkoutForm key={newArrayOfMoves} newArrayOfMoves={newArrayOfMoves}
                                key={workout.id} workout={workout} />
                        }
                    </div>

                </form>
            </div>
        </>
    )
}