import React, { Component } from 'react'
import EventManager from '../../modules/EventManager'

export default class EventEditForm extends Component{
  state={
    eventName: "",
    eventDate: "",
    eventLocation: ""
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}
  componentDidMount(){
    EventManager.get(this.props.match.params.eventId).then(events => {
      this.setState({
        eventName:events.eventName,
        eventDate:events.eventDate,
        eventLocation:events.eventLocation
      })
    })
  }

  updateExistingEvent = evt => {
      evt.preventDefault()

      const existingEvent = {
        eventName:this.state.eventName,
        eventDate: this.state.eventDate,
        eventLocation:this.state.eventLocation
      }
      this.props.updateEvent(this.props.match.params.eventId, existingEvent)
      .then(() => this.props.history.push("/events"))
    }

  render() {
    return (
        <React.Fragment>
            <form className="eventForm">
                <div className="form-group">
                    <label htmlFor="eventName">What do you need to do?</label>
                    <input type="text" required
                          className="form-control"
                          onChange={this.handleFieldChange}
                          id="eventName"
                          value={this.state.eventName}
                          />
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">When do you need it done?</label>
                    <input type="date" required
                          className="form-control"
                          onChange={this.handleFieldChange}
                          id="dueDate"
                          value={this.state.dueDate}
                          />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="completed"></label>
                    <input type="checkbox" required
                          className="form-control"
                          onChange={this.handleFieldChange}
                          id="completed"
                          value={this.state.completed}
                          />
                </div> */}
                <button type="submit" onClick={this.updateExistingEvent} className="btn btn-primary">Update</button>
            </form>
        </React.Fragment>
    )
}
}