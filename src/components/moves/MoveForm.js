import React, { useContext, useEffect, useState } from "react"
import { EquipmentContext } from "../extras/EquipmentProvider"
import { MuscleGroupContext } from "../extras/MuscleGroupProvider"
import { MoveContext } from "./MoveProvider"
import "./Move.css"
import { useHistory } from 'react-router-dom';

export const MoveForm = () => {
    const { addMove } = useContext(MoveContext)
    const { equipment, getEquipment } = useContext(EquipmentContext)
    const { muscleGroup, getMuscleGroup } = useContext(MuscleGroupContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the intial state of the form inputs with useState()
    */

    const [move, setMove] = useState({
      name: "",
      description: "",
      equipmentId: 0,
      muscleGroupId: 0,
      userId: parseInt(localStorage.getItem("mobi_user"))
    });

    const history = useHistory();

    /*
    Reach out to the world and get customers state
    and locations state on initialization, so we can provide their data in the form dropdowns
    */
    useEffect(() => {
      getEquipment()
      .then(getMuscleGroup)
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newMove = { ...move }
      let selectedVal = event.target.value
      // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids
      if (event.target.id.includes("Id")) {
        selectedVal = parseInt(selectedVal)
      }
      /* Move is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newMove[event.target.id] = selectedVal

      // update state
      setMove(newMove)
    }

    const handleClickSaveMove = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form

      const equipmentId = move.equipmentId
      const muscleGroupId = move.muscleGroupId

      if (equipmentId === 0 || muscleGroupId === 0) {
        window.alert("Please select your equipment and the right muscle group")
      } else {
        //invoke addMove passing move as an argument.
        //once complete, change the url and display the move list
        addMove(move)
        .then(() => history.push("/moves"))
      }
    }

    return (
      <form className="moveForm">
          <h2 className="moveForm__title">Add A Move</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Move name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Move name" value={move.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="description">Move description:</label>
                  <input type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Description" value={move.description}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="equipment">What equipment do you need? </label>
                  <select defaultValue={move.equipmentId} name="equipmentId" id="equipmentId" onChange={handleControlledInputChange} className="form-control" >
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
                  <label htmlFor="muscleGroupId">Select a muscle group: </label>
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
    )
}