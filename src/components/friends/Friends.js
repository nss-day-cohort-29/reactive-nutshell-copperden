import React, { Component } from 'react'
import FriendsManager from "../../modules/FriendsManager"

export class Friends extends Component {

  state = {
    currentUsersFriends: []
  };

  componentDidMount() {
    let currentUser = sessionStorage.getItem("userId");
    let currentUserId = Number(currentUser);

    FriendsManager.getFriendsByCurrentUser(currentUserId)
    .then(allFriends => {
    this.setState({ currentUsersFriends: allFriends})
      });
    }

  
  render() {


    return (
      <div>
          <button className="btn btn-primary" onClick={() => {
          this.props.history.push("/friends/add-friend")}
          }>Add Friends</button>
          <div className="current-friends-div">
            <h2>Your Friends</h2>
            {this.state.currentUsersFriends.map(friend => 
              <div key={friend.user.id}>{friend.user.name}
              <button className="btn" onClick={() => console.log("deleted")}>Delete</button>
              </div>)}
          </div>
      </div>
    )
  }
}

export default Friends
