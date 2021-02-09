import React from "react"
import { Route } from "react-router-dom"
import { EquipmentProvider } from "./extras/EquipmentProvider"
import { IntervalProvider } from "./extras/IntervalProvider"
import { MoveCombinationProvider } from "./extras/MoveCombinationProvider"
import { MoveDetail } from "./moves/MoveDetail"
import { MoveForm } from "./moves/MoveForm"
import { MoveList } from "./moves/MoveList"
import { MoveProvider } from "./moves/MoveProvider"
import { MuscleGroupProvider } from "./extras/MuscleGroupProvider"
import { SetProvider } from "./extras/SetProvider"
import { WorkoutList } from "./workouts/WorkoutList"
import { WorkoutProvider } from "./workouts/WorkoutProvider"
import { WorkoutView } from "./workouts/WorkoutView"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the workout library when http://localhost:3000/workouts */}
            <WorkoutProvider>
                <Route exact path="/workouts">
                    <WorkoutList />
                </Route>
            </WorkoutProvider>

            <WorkoutProvider>
                <MoveCombinationProvider>
                    <EquipmentProvider>
                        <Route exact path="/workouts/view/:workoutId(\d+)">
                            <WorkoutView />
                        </Route>
                    </EquipmentProvider>
                </MoveCombinationProvider>
            </WorkoutProvider>

            {/* Render the excercise library when http://localhost:3000/moves */}

            <WorkoutProvider>
                <MoveProvider>
                    <MoveCombinationProvider>
                        <IntervalProvider>
                            <SetProvider>
                                <MuscleGroupProvider>
                                    <EquipmentProvider>
                                        <Route exact path="/moves">
                                            <MoveList />
                                        </Route>
                                    </EquipmentProvider>
                                </MuscleGroupProvider>
                            </SetProvider>
                        </IntervalProvider>
                    </MoveCombinationProvider>
                </MoveProvider>
            </WorkoutProvider>

            <MoveProvider>
                <Route exact path="/moves/detail/:moveId(\d+)">
                    <MoveDetail />
                </Route>
            </MoveProvider>

            <MoveProvider>
                <EquipmentProvider>
                    <MuscleGroupProvider>
                        <Route exact path="/moves/create">
                            <MoveForm />
                        </Route>
                    </MuscleGroupProvider>
                </EquipmentProvider>
            </MoveProvider>
        </>
    )
}