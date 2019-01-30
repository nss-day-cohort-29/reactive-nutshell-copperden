import React, { Component } from 'react'

export class Friends extends Component {
  render() {

    let currentUser = sessionStorage.getItem("credentials");
    console.log(currentUser);
    return (
      <div>
          <button className="btn">Add Friends</button>
          <div className="current-friends-div">
            <h2>Your Friends</h2>
            {this.props.friends.map(friend => {
                console.log(friend.id)
            })}
          
          </div>
        
      </div>
    )
  }
}

export default Friends
