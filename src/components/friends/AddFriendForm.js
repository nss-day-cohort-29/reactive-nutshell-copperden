import React, { Component } from 'react'

export class AddFriendForm extends Component {
  render() {
    return (
      <div>
        <h2>Add Friend</h2>
        <input></input>
        <br/>
        <button className="btn btn-primary">Add Friend</button>
        <button className="btn btn-primary" onClick={() => {
        this.props.history.push("/friends")}
        }>Cancel</button>
      </div>
    )
  }
}

export default AddFriendForm
