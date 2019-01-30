import React, { Component } from 'react'
import "./ChatRoom.css"
import ChatManager from '../../modules/ChatManager';

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
        console.log(evt.target.id, evt.target.value);
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

    // Event listener that asks if you want to friend a user when you click on their username.
    addFriend = () => {
        // if the user isn't the session user
        if (this.props.message.userId !== 1) {
            // fetch all friends and filter by currentUserId
            return fetch("http://localhost:5002/friends?_expand=currentUserId")
            .then(data => data.json())

            // for each friend connection, check to see if userId matches this.props.message.userId
            // if it does NOT, then show confirm dialog

            .then(() => {
                if (window.confirm(`Do you want to add ${this.props.message.user.name} as a friend?`)) {
                    console.log("HI FREN");
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