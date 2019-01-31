import React, { Component } from 'react'

export class Friends extends Component {
  render() {
// Grab the username out of session storage
    let currentUser = sessionStorage.getItem("username");
// Map through all users and filter out all users who's username does not equal what is in session storage.
    let usersArray = this.props.users.map(user => {return user}).filter(user => user.name === currentUser);
// Get the id of the user found in the database
    let currentUserIdFound = usersArray.map(user => {return user.id});
// Convert the id into an interager
    let currentUserIdentifier = Number(currentUserIdFound);
    console.log("woop", currentUserIdentifier);
// Filter through the list of friends in the database to find which relationships match with the current user's id
   let theFriends = this.props.friends.filter(friend => friend.currentUserId === currentUserIdentifier)

    theFriends.map(friend => console.log("friends userID:", friend.userId))

    let friendsUserIds = theFriends.map(friend => {return friend.userId});

    let actualFriends = friendsUserIds.filter(friend => friend.userId === this.props.friends.id);

    actualFriends.map(friend => console.log("This guy", friend.name))

    

    return (
      <div>
          <button className="btn">Add Friends</button>
          <div className="current-friends-div">
            <h2>Your Friends</h2>
            

            
          
          </div>
        
      </div>
    )
  }
}

export default Friends
