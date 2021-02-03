import React from "react"
import { useHistory } from "react-router-dom"
import "./Workout.css"


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