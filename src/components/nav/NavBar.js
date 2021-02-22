import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

// Only have two NavBar options - Workouts and Moves. Would like to add a Logout button in the future.

export const NavBar = (props) => {

    const history = useHistory()

    const handleLogOutButton = () => {
        history.push(`/login`)
        localStorage.clear()
    }

    return (
        <>
            <div className="navbar__header">
                <div className="logo">
                    <h1>MOBI</h1>
                    </div>
              
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/workouts"><h2>WORKOUTS</h2></Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/moves"><h2>MOVES</h2></Link>
                </li>
            </ul>
            <div>
                    <button className="logOutBtn" onClick={handleLogOutButton}>Logout</button>
                </div>
            </div>
        </>
    )
}