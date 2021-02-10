import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutCard } from "./WorkoutCard"
import "./Workout.css"

export const WorkoutList = () => {

    //--- This state changes when `getWorkouts()` is invoked below

    const { workouts, getWorkouts } = useContext(WorkoutContext)

    const history = useHistory()

    //--- Retrieving the id of the current user from localStorage
    const currentUserId = (parseInt(localStorage.getItem("mobi_user")))

    //--- Filtering through the workouts to only show the workouts for the current user
    let filteredArray = workouts.filter(w => w.userId === currentUserId)

    //--- Sorting the filteredArray to show the workouts in alphabetical order.
    let newFilteredArray = filteredArray.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();

        return fa == fb ? 0 : fa > fb ? 1 : -1
    })

    //--- useEffect - reach out to the world to get the workouts
    useEffect(() => {
        getWorkouts()
    }, [])

    //--- Making workout cards from the alphabetized array of workouts associated with the current user
    return (
        <>
            <div className="workoutLibrary">
                <h1>Workout Library</h1>

                <button className="buildAWorkout" onClick={() => { history.push("/moves") }}>
                    Build A Workout
                </button>
            </div>
            <div className="workouts">
                {
                    newFilteredArray.map(workout => {
                        return <WorkoutCard key={workout.id} workout={workout} />
                    })
                }
            </div>
        </>
    )


}