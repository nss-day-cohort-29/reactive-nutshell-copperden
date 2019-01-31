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
        if (this.state.message !== "" && this.state.userId === 1) {
            return (
                <div className="message_text">
                    <form className="chatEditForm" onSubmit={this.updateExistingMessage}>
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

    // userConditionalEdit = (userId) => {
    //     if (this.props.message.userId === 1) {
    //         return (
    //             <div className="bottom_info">
    //                 {this.props.message.timeDisplay} | <a href="#" className="edit_link" onClick={this.editLink}>edit</a>
    //             </div>
    //         )
    //     }
    //     else {
    //         return (
    //             <div className="bottom_info">{this.props.message.timeDisplay}</div>
    //         )
    //     }
    // }

    // Sets the "bubble" style for current user vs other users
    userConditionalStyle = (userId) => {
        if (this.props.message.userId === 1) {
            let style = "current_user";
            return style;
        }
        else {
            let style = "other_user"
            return style;
        }
    }

    // Edit existing message upon submission.
    // Resets 'message' in state to empty so that static message text displays.
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
        // if the user isn't the session user
        if (this.props.message.userId !== 1) {              // change to SESSION USER
            let currentUserId = 1;
            let userId = this.props.message.userId;
            // fetch all friends
            FriendsManager.getFriendship(currentUserId, userId)
            .then(allConnections => {
                // find this connection
                let results = allConnections.find( connection => connection.currentUserId === 1 && connection.userId === userId );
                    if (results === undefined) {
                        if (window.confirm(`Do you want to add ${this.props.message.user.name} as a friend?`)) {
                                 this.createFriendship(currentUserId, userId)
                            }
                    }
                    else {
                        alert("You're already friends!")
                    }

            }) // .then closing
        } // if closing
    }   // addFriend closing

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