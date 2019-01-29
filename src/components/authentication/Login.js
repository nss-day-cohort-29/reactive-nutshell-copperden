import React, { Component } from "react"


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
    handleLogin = (e) => {
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
            <form onSubmit={this.handleLogin}>
                <h2>Please sign in</h2>
                <label htmlFor="inputUsername">
                    Username:
                </label> <br></br>
                <input onChange={this.handleFieldChange} type="text"
                       id="username"
                       placeholder="John Doe"
                       required autoFocus="" />
                       <br></br> <hr></hr>
                <label htmlFor="inputPassword">
                    Password:
                </label>
                <br></br>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required />
                       <br></br> <hr></hr>
                <button type="submit">
                    Sign in
                </button>
            </form>
        )
    }
}