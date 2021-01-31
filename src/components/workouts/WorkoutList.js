import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutCard } from "./WorkoutCard"
import "./Workout.css"

export const WorkoutList = () => {

  // This state changes when `getWorkouts()` is invoked below
  const { workouts, getWorkouts } = useContext(WorkoutContext)

  const history = useHistory()
  const currentUserId = (parseInt(localStorage.getItem("mobi_user")))
  const filteredArray = workouts.filter(w => w.userId === currentUserId)

  //useEffect - reach out to the world for something
  useEffect(() => {
    getWorkouts()
  }, [])


    return (
        <>
            <h1>Workout Library</h1>

            <button onClick={() => {history.push("/workouts/create")}}>
                Build A Workout
            </button>

            <div className="workouts">
                {
                    filteredArray.map(workout => {
                        return <WorkoutCard key={workout.id} workout={workout} />
                    })
                }
            </div>
        </>
    )

    
}