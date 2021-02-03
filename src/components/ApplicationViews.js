import React from "react"
import { Route } from "react-router-dom"
import { WorkoutList } from "./workouts/WorkoutList"
import { WorkoutProvider } from "./workouts/WorkoutProvider"
import { WorkoutView } from "./workouts/WorkoutView"
import { MoveProvider } from "./moves/MoveProvider"
import { MoveList } from "./moves/MoveList"
import { MoveDetail } from "./moves/MoveDetail"
import { MoveForm } from "./moves/MoveForm"
import { EquipmentProvider } from "./extras/EquipmentProvider"
import { MuscleGroupProvider } from "./extras/MuscleGroupProvider"
import { MoveCombinationProvider } from "./extras/MoveCombinationProvider"
import { IntervalProvider } from "./extras/IntervalProvider"
import { SetProvider } from "./extras/SetProvider"


export const ApplicationViews = () => {
    return (
        <>
            {/* Render the workout library when http://localhost:3000/ */}
            <WorkoutProvider>
                <Route exact path="/workouts">
                    <WorkoutList />
                </Route>
            </WorkoutProvider>

            <WorkoutProvider>
                <MoveCombinationProvider>
                    <Route path="/workouts/view/:workoutId(\d+)">
                        <WorkoutView />
                    </Route>
                </MoveCombinationProvider>
            </WorkoutProvider>

            {/* Render the excercise library when http://localhost:3000/moves */}

            <MoveProvider>
                <Route path="/moves/detail/:moveId(\d+)">
                    <MoveDetail />
                </Route>
            </MoveProvider>


            <WorkoutProvider>
                <MoveProvider>
                    <MoveCombinationProvider>
                        <IntervalProvider>
                            <SetProvider>
                                <Route exact path="/moves">
                                    <MoveList />
                                </Route>
                            </SetProvider>
                        </IntervalProvider>
                    </MoveCombinationProvider>
                </MoveProvider>
            </WorkoutProvider>
            

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