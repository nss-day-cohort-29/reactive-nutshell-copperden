import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"


class NavBar extends Component {

    clearSession = () => {
        sessionStorage.clear();
    }

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill centerMobileNav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">News</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/friends">Friends</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/messages">Messages</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks">Tasks</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/events">Events</Link>
                    </li>
                    <li>
                        <Link className="nav-link" onClick={this.clearSession} to="/login">Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar