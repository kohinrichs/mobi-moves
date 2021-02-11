import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { EquipmentContext } from "../extras/EquipmentProvider"
import { MoveContext } from "./MoveProvider"
import { MuscleGroupContext } from "../extras/MuscleGroupProvider"
import "./Move.css"

export const MoveForm = () => {
  const { moves, getMoves, addMove, getMoveById, updateMove } = useContext(MoveContext)
  const { equipment, getEquipment } = useContext(EquipmentContext)
  const { muscleGroup, getMuscleGroup } = useContext(MuscleGroupContext)

  const currentUserId = (parseInt(localStorage.getItem("mobi_user")))

  const { moveId } = useParams();

  const history = useHistory();

  //--- Set current location equal to a variable so it can be checked in the if/else statements when trying to save a move
  let currentLocation = history.location.pathname

  //--- Defining the intial state of the move inputs with useState()
  const [move, setMove] = useState({
    name: "",
    description: "",
    equipmentId: 0,
    muscleGroupId: 0,
    userId: currentUserId
  });

  //--- Wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  //--- When a field changes in the form, update state. The return will re-render and display based on the values in state controlled component. Used 
  const handleControlledInputChange = (event) => {

    //--- Since we will be making changes to a state object or array, create a copy using spread, make changes, and then set state.
    const newMove = { ...move }

    // //--- Since forms always provide values as strings - parseInt to save Ids as numbers
    // if (event.target.id.includes("Id")) {
    //   selectedVal = parseInt(selectedVal)
    // }

    //--- Setting the property of move to the new value using object bracket notation.
    newMove[event.target.id] = event.target.value

    //--- Update the state with the newMove object
    setMove(newMove)
  }

  //--- For handling saveMove
  const handleClickSaveMove = () => {
    // //--- Prevents the browser from submitting the form
    // event.preventDefault()
    debugger
    //--- Setting variables for the if statement
    const name = move.name
    const description = move.description
    const equipmentId = move.equipmentId
    const muscleGroupId = move.muscleGroupId

    //--- Prevent the form from being submitted if it is incomplete. Also, checks move name against other move names associated with the user to prevent duplicates.
    if (name == "" || description === "" || equipmentId === 0 || muscleGroupId === 0) {
      window.alert("Please fill out the entire form.")
      // Something about the URL being for create
    } else if (currentLocation === "/moves/create" && moves.filter(m => m.userId === currentUserId).find(m => m.name === name)) {
      window.alert("Oh no! You already have a move with this name. Please use a different name.")
    } else {
      //--- Disable button - no extra clicks
      setIsLoading(true);
      if (moveId) {
        //--- PUT - update
        updateMove({
          name: move.name,
          description: move.description,
          equipmentId: parseInt(move.equipmentId),
          muscleGroupId: parseInt(move.muscleGroupId),
          userId: parseInt(currentUserId),
          id: move.id
        })
          .then(() => history.push(`/moves/detail/${move.id}`))
      } else {
        //--- POST - add
        addMove({
          name: move.name,
          description: move.description,
          equipmentId: parseInt(move.equipmentId),
          muscleGroupId: parseInt(move.muscleGroupId),
          userId: parseInt(currentUserId)
        })
          .then(() => history.push("/moves"))
      }
    }
  }

  //--- Reaching out to the world and get the equipment state and muscleGroup state on initialization, so we can provide their data in the form dropdowns
  useEffect(() => {
    getEquipment()
      .then(getMuscleGroup)
      .then(getMoves)
      .then(() => {
        if (moveId) {
          getMoveById(moveId)
            .then(move => {
              setMove(move)
              setIsLoading(false)
            })
        } else {
          setIsLoading(false)
        }
      })
  }, [])

  return (
    <>
      <button onClick={() => {
        moveId ? history.push(`/moves/detail/${move.id}`) : history.push("/moves")
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
            <select value={move.equipmentId} id="equipmentId" onChange={handleControlledInputChange} className="form-control" >
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
            <select value={move.muscleGroupId} id="muscleGroupId" onChange={handleControlledInputChange} className="form-control" >
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
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleClickSaveMove()
          }}>
          {moveId ? <>Save</> : <>Add</>}
        </button>
      </form>
    </>
  )
}