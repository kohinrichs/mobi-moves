import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { EquipmentContext } from "../extras/EquipmentProvider"
import { MoveCombinationContext } from "../extras/MoveCombinationProvider"
import { MoveCombinationCard } from "../extras/MoveCombinationCard"
import { WorkoutContext } from "./WorkoutProvider"
import "./WorkoutView.css"

export const WorkoutView = () => {
  const { getWorkoutById, deleteWorkout } = useContext(WorkoutContext)
  const { moveCombinations, getMoveCombinations, deleteMoveCombination } = useContext(MoveCombinationContext)
  const { equipment, getEquipment } = useContext(EquipmentContext)

  const { workoutId } = useParams();
  const history = useHistory();

  const [workout, setWorkout] = useState({})

  // --- Filtering through the moveCombination to find the ones that match the chosen workout using useParams and the workoutId
  let filteredArray = moveCombinations.filter(mc => mc.workoutId === parseInt(workoutId))

  //--- Sorting the filteredArray to organize the matching moveCombinations by their position in the workout
  filteredArray.sort(function (a, b) {
    return a.positionInWorkout - b.positionInWorkout
  })

  //--- For the Equipment List
  //--- getMoveCombinations has an expand to also get the move details for the move associated with the moveCombination. Map over the list of moveCombinations for
  // the workout to get the equipment Ids from the move
  let equipmentList = filteredArray.map(e => e.move.equipmentId)

  //--- Create a new array of equipment Ids using spread and then Set to eliminate duplicate ids
  let uniqueEquipmentList = [...new Set(equipmentList)]

  //--- Remove equipmentId 6 (No equipment) from the array.
  uniqueEquipmentList = uniqueEquipmentList.filter(e => e !== 6)

  //--- Filter through the equipment from the equipmentProvider to match equipmentIds in the array of equipment for this specific workout to equipmentNames. Create
  // an array of equipment names for print. .includes() returns true or false
  let equipmentListForPrint = equipment.filter(e => uniqueEquipmentList.includes(e.id)).map(e => e.name)

  //--- Upon button click, each move in the filteredArray will be deleted by id and then the workout will be deleted from the provider and the user will be rerouted
  // to the Workouts view.
  const handleDelete = () => {
    Promise.all(filteredArray.map(mc => deleteMoveCombination(mc.id)))
      .then(() => { deleteWorkout(workoutId) })
      .then(() => { history.push("/workouts") })
  }
  //--- useEffect - reach out to the world to get what we need for this module. This is also where we are getting the workout by Id and setting it to state is being set so the state to
  // be used below in the return
  useEffect(() => {
    getMoveCombinations()
      .then(getEquipment)
      .then(getWorkoutById(workoutId)
        .then(workout => { setWorkout(workout) })
      )
  }, [])

  //--- Using the workout state, filteredArray of moveCombinations, and the equipmentListForPrint - print what is to be shown to the user in the DOM. For the equipmentList,
  // use a terenary operator to check that there is something in the equipmentListForPrint array. If there is not, "No equipment Needed" is printed.
  return (
    <>
      <div className="buttonContainer">
        <button className="button__back" onClick={() => {
          history.push(`/workouts`)
        }}>Back</button>
      </div>
      <div className="workoutViewCard">
        <div className="workoutViewCard__workout">
          <h3 className="workoutViewCard__workout--name">{workout.name}</h3>
          <div className="workoutViewCard__workout--interval">Interval: {workout.interval?.intervalTime}</div>
          <div className="workoutViewCard__workout--set">Sets: {workout.set?.numberOfSets}</div>

          <div className="workoutViewCard__moves">
            {
              filteredArray.map(mc => {
                return <MoveCombinationCard key={mc.id} mc={mc} />
              })
            }
          </div>

          <div className="workoutViewCard__equipmentList">
            <h3 className="workoutViewCard__equipmentList--name">Equipment List:</h3>
            <div>
              {
                equipmentListForPrint.length ? equipmentListForPrint.map(equipment => equipment).join(", ") : "No Equipment Needed"
              }
            </div>
          </div>

          <button className="button__deleteWorkout" onClick={handleDelete}>DELETE</button>
        </div>
      </div>
    </>
  )
}