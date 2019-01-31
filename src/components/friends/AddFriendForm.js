import React, { Component } from 'react'

export class AddFriendForm extends Component {
  render() {
    return (
      <div>
        <h2>Add Friends</h2>
        <input></input>
        <button>Search</button>
        <br/>
        <button>Add Friend</button>
        <button onClick={() => {
        this.props.history.push("/friends")}
        }>Cancel</button>
      </div>
    )
  }
}

export default AddFriendForm
