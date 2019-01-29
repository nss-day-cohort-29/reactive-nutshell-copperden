import React, { Component } from "react"
import "./Login.css"
import { Link } from "react-router-dom"


export default class Login extends Component {

    // Set initial state
    state = {
        username: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleRegister = (e) => {
        e.preventDefault()

        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        )
    }

    render() {
        return (
            <form onSubmit={this.handleRegister}>
                <h2>Sign up</h2>
                <label htmlFor="inputUsername">
                </label><br></br>
                <input onChange={this.handleFieldChange} type="text"
                       id="username"
                       placeholder="Enter a username"
                       required autoFocus="" />
                       <br></br>
                <label htmlFor="inputPassword">
                </label>
                <br></br>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Enter a password"
                       required />
                       <br></br>

                <button type="submit" className="btn btn-primary signIn">
                    Sign Up
                </button>
            </form>
        )
    }
}