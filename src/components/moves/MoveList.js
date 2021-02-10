import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { BuildAWorkoutForm } from "./BuildAWorkoutForm"
import { IntervalContext } from "../extras/IntervalProvider"
import { MoveContext } from "./MoveProvider"
import { MoveCard } from "./MoveCard"
import { SetContext } from "../extras/SetProvider"
import "./Move.css"


export const MoveList = () => {
    //--- These states changes when getMoves, getInterval, and getSet are invoked below
    const { moves, getMoves } = useContext(MoveContext)
    const { interval, getInterval } = useContext(IntervalContext)
    const { set, getSet } = useContext(SetContext)

    const history = useHistory()

    //--- Setting the current userId to the id of the logged in user via localStorage
    const currentUserId = (parseInt(localStorage.getItem("mobi_user")))

    //--- Filtering all the moves so that only the moves associated with the current logged in user display in the Exercise Library
    let filteredArray = moves.filter(m => m.userId === currentUserId)

     //--- Sorting the filteredArray to show the moves in alphabetical order.
     let newFilteredArray = filteredArray.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();

        return fa == fb ? 0 : fa > fb ? 1 : -1
    })

    //--- This will be updated to when information is received from the MoveCard and the state is set in the MoveForForm function
    const [arrayOfMoves, setArrayOfMoves] = useState([])

    //--- Defining the intial state of the workout inputs with useState()
    const [workout, setWorkout] = useState({
        name: "",
        intervalId: 0,
        setId: 0,
        userId: parseInt(localStorage.getItem("mobi_user")),
        id: 0
    });

    //--- useEffect - reach out to the world for moves, intervals, and sets
    useEffect(() => {
        getMoves()
            .then(getInterval)
            .then(getSet)
    }, [])

    //--- Callback function used when the Add To Workout button is clicked on MoveCard so the move information can be shared with the BuildAWorkoutForm. On clicking the add to 
    // workout button, the function takes the move object as a parameter and adds it to the newArrayOfMoves. Then the state is set with the newArrayOfMoves

    //--- Use spread operator to create a copy of arrayOfMoves
    let newArrayOfMoves = [...arrayOfMoves]

    const MoveForForm = (move) => {
        //--- If/else so move can't be added to a workout multiple times.
        if (newArrayOfMoves.find(m => m.id === move.id)) {
            window.alert("Oh no! This move has already been added to the workout. Please pick a different move.")
        } else {
            newArrayOfMoves.push(move)
            setArrayOfMoves(newArrayOfMoves)
        }
    }

    //--- Callback function used when the X button is clicked on the BuildAWorkoutForm to remove a move from the workout being built. On click,
    // the function takes the move object as a parameter and filters it out of the current arrayOfMoves and then sets the new state.

    //--- Use spread operator to create a copy of newArrayOfMoves
    let updatedArrayOfMoves = [...newArrayOfMoves]

    const RemoveMoveFromWorkout = (move) => {
        updatedArrayOfMoves = updatedArrayOfMoves.filter(m => m.id !== move.id)
        setArrayOfMoves(updatedArrayOfMoves)
    }

    //--- In order to avoid the form selections clearing upon re-render when a new move is added, I moved the top portion of the BuildAWorkoutForm to the MoveList so the state
    // could be managed by a higher level component and persist as new moves are added to the workout. The function below manages the workout state as the user enters informaiton and 
    // makes selections on the form.

    const handleControlledInputChange = (event) => {

        //--- Used the spread operator to make a copy of workout.
        const newWorkout = { ...workout }

        //--- Setting the values for newWorkout
        let selectedVal = event.target.value

        // Since forms always provide values as strings, need to parseIn any Ids we want to save as numbers

        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        // Set the properties of newWorkout to the new values using object bracket notation.
        newWorkout[event.target.id] = selectedVal

        //--- Update the state of workout using newWorkout
        setWorkout(newWorkout)
    }

    //--- The return contains the Add Move button, the library of moves (sorted and displayed by muscle group), and the Build A Workout Form (the top half on this component and the
    // list of moves imported as part of the BuildAWorkout component.) MoveList is also sending two pieces of information to the BuildAWorkoutForm - the array of moves to add to the
    // workout and the user generated information from the name and selects for the workout form.

    return (
        <>
            <h1>Excercise Library</h1>
            <button onClick={() => { history.push("/moves/create") }}>
                Add A Move
            </button>
            <div className="movePage">
                <div className="movesView">
                    <div className="moves">
                        <h3>Upper Body</h3>
                        <div className="moves--upper">
                            {
                                newFilteredArray.filter(m => m.muscleGroup.id === 1).map(move => {
                                    return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                                })
                            }
                        </div>
                    </div>
                    <div className="moves">
                        <h3>Lower Body</h3>
                        <div className="moves--lower">
                            {
                                newFilteredArray.filter(m => m.muscleGroup.id === 2).map(move => {
                                    return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                                })
                            }
                        </div>
                    </div>
                    <div className="moves">
                        <h3>Core</h3>
                        <div className="moves--core">
                            {
                                newFilteredArray.filter(m => m.muscleGroup.id === 3).map(move => {
                                    return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                                })
                            }
                        </div>
                    </div>
                    <div className="moves">
                        <h3>Cardio</h3>
                        <div className="moves--cardio">
                            {
                                newFilteredArray.filter(m => m.muscleGroup.id === 4).map(move => {
                                    return <MoveCard key={move.id} move={move} handleClick={MoveForForm} />
                                })
                            }
                        </div>
                    </div>
                    <div className="moves">
                        <h3>Warm-up/Mobility</h3>
                        <div className="moves--warmUp">
                            {
                                newFilteredArray.filter(m => m.muscleGroup.id === 5).map(move => {
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
                                <BuildAWorkoutForm key={arrayOfMoves} arrayOfMoves={arrayOfMoves}
                                    key={workout.id} workout={workout} handleRemoveMove={RemoveMoveFromWorkout} />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}