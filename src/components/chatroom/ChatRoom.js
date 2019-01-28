import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import "./ChatRoom.css"

export default class ChatRoom extends Component {
    render() {
        return (
            <section>
                <h1>Chat</h1>
                <div className="chatroom">
                {
                    this.props.messages.map(message =>
                        <div key={message.id}>
                            <div className="message_box">
                                <span className="username">{message.user.name} wrote:</span>
                                <br />
                                <span className="message_text">{message.message}</span>
                                <br />
                            </div>
                            {/* <Link className="nav-link" to={`messages/${message.id}/edit`}>Edit</Link> */}
                        </div>
                    )
                }
                </div>
            </section>
        )
    }
}