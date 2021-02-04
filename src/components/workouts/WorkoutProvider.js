import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const WorkoutContext = createContext()

// This component establishes what data can be used.
export const WorkoutProvider = (props) => {
    const [workouts, setWorkouts] = useState([])

    const getWorkouts = () => {
        return fetch("http://localhost:8088/workouts?_expand=interval&_expand=set")
        .then(res => res.json())
        .then(setWorkouts)
    }

    const getWorkoutById = (id) => {
        return fetch(`http://localhost:8088/workouts/${id}?_expand=interval&_expand=set`)
            .then(res => res.json())
    }

    const addWorkout = (workout) => {
        return fetch("http://localhost:8088/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workout)
        })
        .then((newWorkout) => newWorkout.json())
        .then(workout => {
            console.log(workout)
            getWorkouts()
            return workout
        })
    }

    const deleteWorkout = workoutId => {
        return fetch(`http://localhost:8088/workouts/${workoutId}`, {
            method: "DELETE"
        })
            .then(getWorkouts)
    }

    const updateWorkout = (workout) => {
        return fetch(`http://localhost:8088/workouts/${workout.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(workout)
        })
          .then(getWorkouts)
      }

    return (
        <WorkoutContext.Provider value={{
            workouts, getWorkouts, addWorkout, getWorkoutById, deleteWorkout, updateWorkout
        }}>
            {props.children}
        </WorkoutContext.Provider>
    )
}
