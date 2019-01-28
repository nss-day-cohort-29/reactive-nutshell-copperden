import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Events from "./events/Events"
import EventManager from "../modules/EventManager"

export default class ApplicationViews extends Component {

  state = {
    articles: [],
    connections: [],
    messages: [],
    tasks: [],
    events: []
  };

  componentDidMount() {

    EventManager.getAll().then(allEvents => {
      this.setState({
        events: allEvents
      });
    });
    
  }

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route
          path="/events" render={props => {
            return <Events events={this.state.events}/>
            // Remove null and return the component which will show the user's tasks
          }}
        />
        
      </React.Fragment>
    );
  }
}
