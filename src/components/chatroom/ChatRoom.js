import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./ChatRoom.css"
import ChatManager from '../../modules/ChatManager';

export default class ChatRoom extends Component {

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

    // Add new message to chat room
    addNewMessage = event => {
        event.preventDefault();     // Cancels the default action of the submit.
        event.target.reset();       // Resets values after submit.

        let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        let d = new Date();
        let month = d.getMonth();
        let date = d.getDate();
        let year = d.getFullYear();
        let hours = d.getHours();
        let minutes = ("0" + d.getMinutes()).slice(-2);
        let suffix = "AM";
	    if (hours > 12) {
		    suffix = "PM";
		    hours = hours - 12;
        }
        else if (hours === 12) {
		    suffix = "PM";
        }
        let dateDisplay = months[month] + "/" + date + "/" + year + " at " + hours + ":" + minutes + " " + suffix;

        let timestamp = d.getTime();

        const newMessage = {
            message: this.state.message,
            timeDisplay: dateDisplay,
            timestamp: timestamp,
            userId: 1
        }

        // Create the message and then refresh chatroom
        this.props.addMessage(newMessage)
    }

    componentDidMount() {
        ChatManager.get(this.props.match.params.messageId)
        .then(message => {
            this.setState({
                message: this.state.message,
                timeDisplay: this.state.timeDisplay,
                timestamp: this.state.timestamp,
                userID: this.state.userId
             })
        })
    }

    // Set scrollbar to bottom
    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        const {chatBox} = this.refs;
        chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
    }

    editLink() {
        console.log("Yay!")
        // const {msg} = this.refs;
        // let editField = document.createElement("p");
        // editField.innerHTML = "Yay!"
        // msg.appendChild = editField;
    }

    // Edit existing message
    updateExistingMessage = evt => {
        evt.preventDefault();

        const existingMessage = {
            message: this.state.message,
            timeDisplay: this.state.timeDisplay,
            timestamp: this.state.timestamp,
            userID: this.state.userId
        }

        this.props.updateMessage(this.props.match.params.messageId, existingMessage)
        .then(() => this.props.history.push("/messages"))
    }

    render() {
        return (
            <section className="chatroom">
                <h1>Chat</h1>
                <div className="chat_box" ref={`chatBox`}>
                {
                    this.props.messages.map(message =>
                        <div key={message.id}>
                            <div className="message_box">
                                <span className="username"><strong>{message.user.name}</strong> wrote:</span>
                                <br />
                                <div className="message_text" ref={`msg`}>{message.message}</div>
                                <div className="bottom_info">
                                    {message.timeDisplay} | <a href="#" className="edit_link" onClick={this.editLink}>Edit</a>
                                    {/* <Link className="edit_link" to={`messages/${message.id}/edit`}>Edit</Link> */}
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
                <form className="chatMessageForm" onSubmit={this.addNewMessage}>
                    <div className="message_input">
                        <input type="text" required
                            placeholder="Enter your message here"
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="message" />
                    </div>
                    <div className="message_btn">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </section>
        )
    }
}