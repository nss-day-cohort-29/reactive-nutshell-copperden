import React, { Component } from 'react'

export class Friends extends Component {
  render() {

    // let currentUser = sessionStorage.getItem("credentials");
    // // console.log(currentUser);

    this.props.friends.map(friend => {
      console.log(friend.userId)
    })


    // this.props.friends.map(friend => {
    //   if(friend.currentUserId === currentUser) {
    //     console.log(friend)}
    //   }
      

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
