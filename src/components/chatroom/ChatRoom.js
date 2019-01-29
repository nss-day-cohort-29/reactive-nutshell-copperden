import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./ChatRoom.css"

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

    render() {
        return (
            <section className="chatroom">
                <h1>Chat</h1>
                <div className="chat_box">
                {
                    this.props.messages.map(message =>
                        <div key={message.id}>
                            <div className="message_box">
                                <span className="username">{message.user.name} wrote:</span>
                                <br />
                                <div className="message_text">{message.message}</div>
                                <div className="bottom_info">
                                    {message.timeDisplay} | <Link className="edit_link" to={`messages/${message.id}/edit`}>Edit</Link>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
                <form id="chatMessageForm" onSubmit={this.addNewMessage}>
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