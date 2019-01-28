import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Events from "./events/Events"
import TaskList from "./tasks/TaskList"
import TaskManager from "../modules/TaskManager"

export default class ApplicationViews extends Component {

  state = {
    articles: [],
    connections: [],
    messages: [],
    tasks: [],
    events: []
  };

  componentDidMount() {
    // GETTING all tasks for user:
    TaskManager.getAllTasks().then(allTasks => {
      this.setState({
          tasks: allTasks
      })
  })
  }

  // DELETE A TASK:
  deleteTask = (id) => {
    return TaskManager.removeAndList(id)
    .then(tasks => this.setState({
        tasks: tasks
      })
    )
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
            return  <Route exact path="/tasks" render={(props) => {
              return <TaskList {...props}
              deleteTask={this.deleteTask}
              tasks={this.state.tasks} />
      }} />
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route
          path="/events" render={props => {
            return <Events />
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
