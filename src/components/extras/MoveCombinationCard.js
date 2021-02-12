import React from "react"

//--- { mc } is passed to the moveCombiation card from WorkoutView. Card display includes the name of the move.

export const MoveCombinationCard = ({ mc }) => {

    return (
        <section className="workoutViewCard__move">
            <h3 className="workoutViewCard__move--name">{mc.move?.name}</h3>
        </section>
    )
}