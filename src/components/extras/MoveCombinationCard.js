import React from "react"
// import "./Workout.css"


export const MoveCombinationCard = ({ mc }) => {

    return (
        <section className="workout_moves--move">
            <h3 className="workout__move--name">{mc.move?.name}</h3>
        </section>
    )
}