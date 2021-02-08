import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { WorkoutContext } from "./WorkoutProvider"
import { MoveCombinationContext } from "../extras/MoveCombinationProvider"
import { MoveCombinationCard } from "../extras/MoveCombinationCard"
import { EquipmentContext } from "../extras/EquipmentProvider"
// import "./Workout.css"

export const WorkoutView = () => {
  const { getWorkoutById, deleteWorkout } = useContext(WorkoutContext)
  const { moveCombinations, getMoveCombinations, deleteMoveCombination } = useContext(MoveCombinationContext)
  const { equipment, getEquipment } = useContext(EquipmentContext)

const {workoutId} = useParams();

  const [workout, setWorkout] = useState({})
 

  const history = useHistory();
  
  let filteredArray = moveCombinations.filter(mc => mc.workoutId === parseInt(workoutId))
  
 filteredArray.sort(function(a,b) {
    return a.positionInWorkout - b.positionInWorkout
  })

  // --- Equipment List
  // Need to map over the filtered array of moveCombinations for this workout and get the equipment Id from each excercise. Remove repeat Ids.
// Then find the matching name for each Id in the array and print it as a list. A value in the Set may only occur once; it is unique in the Set's collection.
// equipment.move?.equipmentId

let equipmentList = filteredArray.map(e => e.move.equipmentId)
console.log(equipmentList)

let uniqueEquipmentList = [...new Set(equipmentList)]
console.log(uniqueEquipmentList)

// Now I need to take the ids in the uniqueEquipmentList array and match them with equipment and return the name of the equipment
// If the id from the array matches an id from the equipment list, give me the .name propery of the equipment

let equipmentListForPrint = equipment.filter(e => uniqueEquipmentList.includes(e.id)).map(e => e.name)
console.log(equipmentListForPrint)

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
         .then(getEquipment)
            .then(getWorkoutById(workoutId)
                .then(workout => { setWorkout(workout) })
            )
    }, [])

  return (
    <>
      <button onClick={() => {
        history.push(`/workouts`)
      }}>Back</button>
      <div className="workoutView">
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

      <div className="workout__equipmentList">
        <h3 className="workout__equipmentList--name">Equipment List:</h3>
        <div>{
          equipmentListForPrint.map(equipment => equipment).join(", ")
        }
        </div>
      </div>

      <button onClick={handleDelete}>DELETE</button>
      </div>
    </>
  )
}