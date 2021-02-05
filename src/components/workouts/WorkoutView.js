import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { WorkoutContext } from "./WorkoutProvider"
import { MoveCombinationContext } from "../extras/MoveCombinationProvider"
import { MoveCombinationCard } from "../extras/MoveCombinationCard"
// import "./Workout.css"

export const WorkoutView = () => {
  const { getWorkoutById, deleteWorkout } = useContext(WorkoutContext)
  const { moveCombinations, getMoveCombinations, deleteMoveCombination } = useContext(MoveCombinationContext)

const {workoutId} = useParams();

  const [workout, setWorkout] = useState({})


  const history = useHistory();
  
  const filteredArray = moveCombinations.filter(mc => mc.workoutId === parseInt(workoutId))
  
 filteredArray.sort(function(a,b) {
    return a.positionInWorkout - b.positionInWorkout
  })
 
  const handleDelete = () => {
    deleteWorkout(workout.id)
      .then(() => {
        history.push("/workouts")
      })
  }

  // There are multiple move combinations associated with each workout. To DELETE the MoveCombinations associated with a workout, you would need to filter 
  // all of the MoveCombinations and delete each instance with a matching workoutId. You would need to do this within the handleDelete function
  // FilteredArray already has all of the mc that match this workout

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