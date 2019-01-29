import React, { Component } from "react";

export default class EventsForm extends Component {
  // Set initial state
  state = {
    eventName: "",
    eventDate: "",
    eventLocation: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const eventToChange = {};
    eventToChange[evt.target.id] = evt.target.value;
    this.setState(eventToChange);
  };

  /*
        Local method for validation, creating event object and
        invoking the function reference passed from parent component
     */
  constructNewEvent = evt => {
    evt.preventDefault();
    if (this.state.eventName === "") {
      window.alert("Please enter a name for your event.");
    } else if (this.state.eventDate === "") {
      window.alert("Please enter a date for your event.")
    } else if (this.state.eventLocation === "") {
      window.alert("Please enter a location for your event.")
    } else {
      const event = {
        name: this.state.eventName,
        date: this.state.eventDate,
        location: this.state.eventLocation
      };

      // Create the event and redirect user to event list
      this.props
        .addEvent(event)
        .then(() => this.props.history.push("/events"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="eventForm">
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventName"
              placeholder="Event Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventDate"
              placeholder="Date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventLocation"
              placeholder="Location"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewEvent}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
