import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "./Events.css"

export class Events extends Component {

   
    
  render() {
    // Creating an array that sorts each event by date
    const sortedEvents = this.props.events.sort(function(eventA, eventB){
        return new Date(eventA.date) - new Date(eventB.date)})
        
    return (
    <>
        <h5 className="event-header">Your Next Event:</h5>
      <div className="event-list">
      
      {/* Building out each event and putting it on the DOM */}
      {sortedEvents.map(event => 
      <div key={event.id} className="event-card">
          <h3 className="even-header">{event.name}</h3>
          <p className="event-date">Date: {event.date}</p>
          <p className="event-location">Location: {event.location}</p>
      {/* Button confirms deletion of event. If the user confirms deletion, event is deleted */}
      <div className="event-button-link">
          <button className="btn btn-primary" onClick={() => {
           let deleteConfirmation = window.confirm(`Are you sure you want to delete ${event.name} on ${event.date}?`)
            if(deleteConfirmation === true) {
            this.props.deleteEvent(event.id)}}}>Delete</button>
      {/*Link that brings up the edit form when clicked  */}
          <Link className="nav-link" to={`/events/${event.id}/edit`}>Edit</Link>
          
        </div>  
        <hr/>
      </div>
      
      )}

        <button className="btn btn-primary event-list-btn" onClick={() => {
        this.props.history.push("/events/new")}
        }>Add Event</button>
       
      </div>
      </>
    )
  }
}

export default Events





