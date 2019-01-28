import React, { Component } from 'react'

export class Events extends Component {

   
    
  render() {
    // Creating an array that sorts each event by date
    const sortedEvents = this.props.events.sort(function(eventA, eventB){
        return new Date(eventA.date) - new Date(eventB.date)})
        
    return (
      <>
      <button>Add Event</button>
      {sortedEvents.map(event => 
      <div key={event.id} className="event-card">
          <h3 className="even-header">{event.name}</h3>
          <p className="event-date">{event.date}</p>
          <p className="event-location">{event.location}</p>
          <button>Delete</button>
          <button>Edit</button>
      </div>
      )}
       
      </>
    )
  }
}

export default Events



