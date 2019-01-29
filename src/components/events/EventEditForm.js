import React, { Component } from 'react'
import EventManager from '../../modules/EventManager'

export default class EventEditForm extends Component{
  state={
    name: "",
    date: "",
    location: ""
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}
  componentDidMount(){
    EventManager.get(this.props.match.params.eventsId).then(events => {
      this.setState({
        name:events.name,
        date:events.date,
        location:events.location
      })
    })
  }

  updateExistingEvent = evt => {
      evt.preventDefault()

      const existingEvent = {
        name:this.state.name,
        date: this.state.date,
        location:this.state.location
      }
      this.props.updateEvent(this.props.match.params.eventsId, existingEvent)
      .then(() => this.props.history.push("/events"))
    }

  render() {
    return (
        <React.Fragment>
            <form className="eventForm">
                <div className="form-group">
                    <label htmlFor="name">Event Name</label>
                    <input type="text" required
                          className="form-control"
                          onChange={this.handleFieldChange}
                          id="name"
                          value={this.state.name}
                          />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Event Date</label>
                    <input type="date" required
                          className="form-control"
                          onChange={this.handleFieldChange}
                          id="date"
                          value={this.state.date}
                          />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Event Location</label>
                    <input type="text" required
                          className="form-control"
                          onChange={this.handleFieldChange}
                          id="location"
                          value={this.state.location}
                          />
                </div>
                <button type="submit" onClick={this.updateExistingEvent} className="btn btn-primary">Update</button>
            </form>
        </React.Fragment>
    )
}
}