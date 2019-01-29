import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class Events extends Component {

   
    
  render() {
    // Creating an array that sorts each event by date
    const sortedEvents = this.props.events.sort(function(eventA, eventB){
        return new Date(eventA.date) - new Date(eventB.date)})
        
    return (
      <>
      <button onClick={() => {
                        this.props.history.push("/events/new")}
                    }>Add Event</button>
      {/* Building out each event and putting it on the DOM */}
      {sortedEvents.map(event => 
      <div key={event.id} className="event-card">
          <h3 className="even-header">{event.name}</h3>
          <p className="event-date">{event.date}</p>
          <p className="event-location">{event.location}</p>
      {/* Button confirms deletion of event. If the user confirms deletion, event is deleted */}
          <button onClick={() => {
           let deleteConfirmation = window.confirm("Are you sure?")
            if(deleteConfirmation === true) {
            this.props.deleteEvent(event.id)}}}>Delete</button>
          <button>
          <Link className="nav-link" to={`/events/${event.id}/edit`}>Edit</Link>
          </button>
      </div>
      )}
       
      </>
    )
  }
}

export default Events





