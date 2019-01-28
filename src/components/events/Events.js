import React, { Component } from 'react'

export class Events extends Component {
  render() {
    return (
      <>
      {this.props.events.sort(function(eventA, eventB){
        return new Date(eventA.date) - new Date(eventB.date)})
        }
       
      </>
    )
  }
}

export default Events

(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });

