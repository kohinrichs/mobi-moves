import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { EquipmentContext } from "../extras/EquipmentProvider"
import { MoveContext } from "./MoveProvider"
import { MuscleGroupContext } from "../extras/MuscleGroupProvider"
import "./Move.css"

export const MoveForm = () => {
  const { moves, getMoves, addMove } = useContext(MoveContext)
  const { equipment, getEquipment } = useContext(EquipmentContext)
  const { muscleGroup, getMuscleGroup } = useContext(MuscleGroupContext)

  const history = useHistory();

  //--- Defining the intial state of the move inputs with useState()
  const [move, setMove] = useState({
    name: "",
    description: "",
    equipmentId: 0,
    muscleGroupId: 0,
    userId: parseInt(localStorage.getItem("mobi_user"))
  });

  //--- Reaching out to the world and get the equipment state and muscleGroup state on initialization, so we can provide their data in the form dropdowns
  useEffect(() => {
    getEquipment()
      .then(getMuscleGroup)
      .then(getMoves)
  }, [])

  //--- When a field changes in the form, update state. The return will re-render and display based on the values in state controlled component. Used 
  const handleControlledInputChange = (event) => {

    //--- Since we will be making changes to a state object or array, create a copy using spread, make changes, and then set state.
    const newMove = { ...move }
    let selectedVal = event.target.value

    //--- Since forms always provide values as strings - parseInt to save Ids as numbers
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal)
    }

    //--- Setting the property of move to the new value using object bracket notation.
    newMove[event.target.id] = selectedVal

    //--- Update the state with the newMove object
    setMove(newMove)
  }

  //--- For handling saveMove
  const handleClickSaveMove = (event) => {

    //--- Prevents the browser from submitting the form
    event.preventDefault()

    //--- Setting variables for the if statement
    const name = move.name
    const description = move.description
    const equipmentId = move.equipmentId
    const muscleGroupId = move.muscleGroupId

    //--- Prevent the form from being submitted if it is incomplete.
    if (name == "" || description === "" || equipmentId === 0 || muscleGroupId === 0) {
      window.alert("Please fill out the entire form.")
    } else if (moves.find(m => m.name === name)) {
      window.alert("Oh no! You alreayd have a move with this name. Please use a different name.")
    } else {
      //--- Invoke addMove with the current state of move. Upon completion, change the url and display the excercise library.
      addMove(move)
        .then(() => history.push("/moves"))
    }
  }

  return (
    <>
      <button onClick={() => {
        history.push(`/moves`)
      }}>Back</button>
      <form className="moveForm">
        <h2 className="moveForm__title">Add A Move</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Move name:</label>
            <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={move.name} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Move description:</label>
            <input type="text" id="description" onChange={handleControlledInputChange} className="form-control" placeholder="Description" value={move.description} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="equipment">What equipment do you need? </label>
            <select defaultValue={move.equipmentId} name="equipment" id="equipmentId" onChange={handleControlledInputChange} className="form-control" >
              <option value="0">Select your equipment</option>
              {equipment.map(e => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="muscleGroup">Select a muscle group: </label>
            <select defaultValue={move.muscleGroupId} name="muscleGroup" id="muscleGroupId" onChange={handleControlledInputChange} className="form-control" >
              <option value="0">Select a muscle group</option>
              {muscleGroup.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <button className="btn btn-primary"
          onClick={handleClickSaveMove}>
          Save
          </button>
      </form>
    </>
  )
}