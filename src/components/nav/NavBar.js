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
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/workouts">Workouts</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/moves">Moves</Link>
                </li>
            </ul>
            <div className="logOutBtn">
                <button className="navbar_item" onClick={handleLogOutButton}>Logout</button>
            </div>
        </>
    )
}