// Component that creates each chat message.
// Author: Megan Cruzen

import React, { Component } from 'react'
import "./ChatRoom.css"
import ChatManager from '../../modules/ChatManager';
import FriendsManager from '../../modules/FriendsManager';

export default class ChatCard extends Component {

    // Set initial state
    state = {
        "message": "",
        "timeDisplay": "",
        "timestamp": "",
        "userId": ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        // console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // When "edit" link is clicked, set state for current ChatCard
    editLink = () => {
        ChatManager.get(this.props.message.id)
        .then(message => {
            this.setState({
                message: message.message,
                timeDisplay: message.timeDisplay,
                timestamp: message.timestamp,
                userId: message.userId
             })
        })
    }

    // This is called inside render.
    // If 'message' in state is not empty, show edit field.
    // Otherwise, show the static message text.
    returnFormOrText = (message) => {
        let sessionUser = sessionStorage.getItem("userId");
        if (this.state.message !== "" && this.state.userId === Number(sessionUser)) {
            return (
                <div className="message_text">
                    <form className="chatEditForm" onSubmit={this.updateExistingMessage} onMouseLeave={this.updateExistingMessage}>
                        <input type="text" required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="message"
                        value={this.state.message} />
                    </form>
                </div>
            )
        } else {
            return (
                <div className="message_text" onClick={this.editLink}>{message}</div>
            )
        }
    }

    // Sets the "bubble" style for current user vs other users
    userConditionalStyle = (userId) => {
        let sessionUser = sessionStorage.getItem("userId");
        if (this.props.message.userId === Number(sessionUser)) {
            let style = "current_user";
            return style;
        }
        else {
            let style = "other_user"
            return style;
        }
    }

    // friendConditionalStyle = (userId) => {
    //     let friendstyle = "";
    //     let sessionUser = sessionStorage.getItem("userId");
    //     if (this.props.message.userId !== Number(sessionUser)) {
    //         // then look through connections
    //         // fetch all friends
    //         let currentUserId = Number(sessionUser);
    //         console.log("session:", currentUserId, " | friend:", userId)
    //         FriendsManager.getFriendship(currentUserId, userId)
    //         .then(allConnections => {
    //             // find this connection
    //             let results = allConnections.find( connection => connection.currentUserId === Number(sessionUser) && connection.userId === userId );
    //                 // if this connection does not exist, i.e. is undefined:
    //                 if (results === undefined) {
    //                     let friendstyle = "notfriend";
    //                     return friendstyle;
    //                 }
    //                 else {
    //                     let friendstyle = "friend";
    //                     return friendstyle;
    //                 }

    //         })
    //         return friendstyle;
    //     }

    //     console.log("style:", friendstyle);
    // }

    // Edit existing message upon submission.
    updateExistingMessage = evt => {
        evt.preventDefault();

        const existingMessage = {
            message: this.state.message,
            timeDisplay: this.state.timeDisplay,
            timestamp: this.state.timestamp,
            userId: this.state.userId
        }

        this.props.updateMessage(this.props.message.id, existingMessage)
        .then(() => {
            // Resets 'message' in state to empty so that static message text displays.
            this.setState({ message: "" })
        })
    }

     // Create new friendship
     createFriendship = (currentUserId, userId) => {

        const newFriendship = {
            currentUserId: currentUserId,
            userId: userId
        }

        // POST the friendship
        this.props.addFriend(newFriendship);
    }

    // Event listener that asks if you want to friend a user when you click on their username.
    addFriend = () => {
        let sessionUser = sessionStorage.getItem("userId");
        // console.log(sessionUser);
        // if the user isn't the session user
        if (this.props.message.userId !== Number(sessionUser)) {
            let currentUserId = Number(sessionUser);
            let userId = this.props.message.userId;
            // fetch all friends
            FriendsManager.getFriendship(currentUserId, userId)
            .then(allConnections => {
                // find this connection
                let results = allConnections.find( connection => connection.currentUserId === Number(sessionUser) && connection.userId === userId );
                    // if this connection does not exist, i.e. is undefined:
                    if (results === undefined) {
                        if (window.confirm(`Do you want to add ${this.props.message.user.name} as a friend?`)) {
                                 this.createFriendship(currentUserId, userId)
                            }
                    }
                    else {
                        alert("You're already friends!")
                    }

            })
        }
    }

    render() {
        return (
                <div key={this.props.message.id} className={this.userConditionalStyle(this.props.message.userId)}>
                    <div className="message_box">
                        <span className="username" onClick={this.addFriend}>{this.props.message.user.name}</span>

                        {this.returnFormOrText(this.props.message.message)}
                        {/* {this.userConditionalEdit(this.props.message.userId)} */}
                        <div className="bottom_info">{this.props.message.timeDisplay}</div>

                    </div>
                </div>

        )
    }
}