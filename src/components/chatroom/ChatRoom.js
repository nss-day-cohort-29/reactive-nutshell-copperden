import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./ChatRoom.css"

export default class ChatRoom extends Component {
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
                                    <Link className="edit_link" to={`messages/${message.id}/edit`}>Edit</Link> | {message.time}</div>
                            </div>
                        </div>
                    )
                }
                </div>
                <form className="chatMessageForm">
                    <div className="message_input">
                        <input type="text" required
                            placeholder="Enter your message here"
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="firstName" />
                    </div>
                    <div className="message_btn">
                        <button type="submit" onClick={console.log("Click clack!")} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </section>
        )
    }
}