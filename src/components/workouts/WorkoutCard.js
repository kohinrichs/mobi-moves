import React from "react"
import { useHistory } from "react-router-dom"
import "./Workout.css"

//--- {workout} is passed to the workout card from WorkoutList. Card includes the name of the workout and a button to view workout.

export const WorkoutCard = ({ workout }) => {

    const history = useHistory()

    return (
        <section className="workout">
            <h3 className="workout__name">{workout.name}</h3>
            <button onClick={() => {
                history.push(`/workouts/view/${workout.id}`)
            }}>View Workout</button>
        </section>
    )
}