import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { WorkoutContext } from "./WorkoutProvider"
import { MoveCombinationContext } from "../extras/MoveCombinationProvider"
import { MoveCombinationCard } from "../extras/MoveCombinationCard"
// import "./Workout.css"

export const WorkoutView = () => {
  const { getWorkoutById, deleteWorkout } = useContext(WorkoutContext)
  const { moveCombinations, getMoveCombinations, deleteMoveCombination } = useContext(MoveCombinationContext)

    // Will need to get all the MoveCombinations and filter through them to find the ones that have a workout Id that matches the workout Id of the current view
    // once you have the filtered array of objects, you'll need to map over them to fill in MoveCombinationCards

    // Could also try to use information from the two things to make a new object

const {workoutId} = useParams();

  const [workout, setWorkout] = useState({})


  const history = useHistory();
  const filteredArray = moveCombinations.filter(mc => mc.workoutId === parseInt(workoutId))
 
  const handleDelete = () => {
    deleteWorkout(workout.id)
      .then(() => {
        history.push("/workouts")
      })
  }

    useEffect(() => {
        getMoveCombinations()
            .then(getWorkoutById(workoutId)
                .then(workout => { setWorkout(workout) })
            )
    }, [])

  return (
      <>
          <section className="workout">
              <h3 className="workout__name">{workout.name}</h3>
              <div className="workout__interval">Interval: {workout.interval?.intervalTime}</div>
              <div className="workout__set">Sets: {workout.set?.numberOfSets}</div>
          </section>

          <div className="workout__moves">
              {
                  filteredArray.map(mc => {
                      return <MoveCombinationCard key={mc.id} mc={mc} />
                  })
              }
          </div>

          <button onClick={handleDelete}>DELETE</button>
      </>
  )
}