import React, { Component } from "react"
import "./Login.css"
import { Link } from "react-router-dom"


export default class Login extends Component {
    // Set initial state
    state = {
        username: "",
        email: ""
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

    //    Setting username in session storage. Grabbing the username from session storage and searching through "users" in the datatbase. The .find attempts to find a username that matches the username in session storage. If able to find a match, log in under that user. If not, display message that username not found.

        sessionStorage.setItem(
            "username",
            this.state.username)

        let currentUser = sessionStorage.getItem("username")
        let authenticated = this.props.users.find(user =>
            user.name === currentUser)


            console.log(authenticated)
            if (authenticated === undefined){
                alert("Whoops! We we couldn't find your account. Please re-renter a valid username and email or sign up below!")
                window.location.reload()
                // this.props.history.push("/register")
            } else {
                this.props.history.push("/")
            }
    }

    render() {

        // if (this.username.length === 0) {
        //     return null
        // }

        return (
            <section className="login">
                <form onSubmit={this.handleLogin}>
                    <h2>Please sign in</h2>
                    <label htmlFor="inputUsername">
                    </label> <br></br>
                    <input onChange={this.handleFieldChange} type="text"
                        id="username"
                        placeholder="Username"
                        required autoFocus="" />
                        <br></br>
                    <label htmlFor="inputEmail">
                    </label>
                    <br></br>
                    <input onChange={this.handleFieldChange} type="email"
                        id="email"
                        placeholder="Email"
                        required />
                        <br></br>

                    {/* <button type="submit" className="btn btn-primary signIn">
                        Sign in
                    </button> */}
                    <button type="submit" className="btn btn-primary signIn" >Sign in</button>

                    <p className="signUp">Don't have an account? <Link className="nav-link signUpLink" to="/register">Sign Up</Link></p>
                </form>
            </section>
        )
    }


    // onClick={() => this.props.history.push("/news")}
}