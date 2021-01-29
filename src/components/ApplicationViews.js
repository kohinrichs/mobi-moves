import React from "react"
import { Route } from "react-router-dom"
import { WorkoutCard } from "./workouts/WorkoutCard"
import { MoveProvider } from "./moves/MoveProvider"
import { MoveList } from "./moves/MoveList"
import { MoveDetail } from "./moves/MoveDetail"
import { MoveForm } from "./moves/MoveForm"
import { EquipmentProvider } from "./extras/EquipmentProvider"
import { MuscleGroupProvider } from "./extras/MuscleGroupProvider"


export const ApplicationViews = () => {
    return (
        <>
            {/* Render the workout library when http://localhost:3000/ */}
            <Route exact path="/">
                <WorkoutCard />
            </Route>

            {/* Render the excercise library when http://localhost:3000/moves */}
            <MoveProvider>
                <Route exact path="/moves">
                    <MoveList />
                </Route>

                <Route path="/moves/detail/:moveId(\d+)">
                    <MoveDetail />
                </Route>
            </MoveProvider>

            <MoveProvider>
                <EquipmentProvider>
                    <MuscleGroupProvider>
                        <Route path="/moves/create">
                            <MoveForm />
                        </Route>
                    </MuscleGroupProvider>
                </EquipmentProvider>
            </MoveProvider>
        </>
    )
}