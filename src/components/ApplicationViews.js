import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Events from "./events/Events"
import EventManager from "../modules/EventManager"
import TaskList from "./tasks/TaskList"
import TaskManager from "../modules/TaskManager"
import TaskForm from "./tasks/TaskForm"

import ChatRoom from "./chatroom/ChatRoom"
import ChatManager from "../modules/ChatManager"
import EventsForm from "./events/EventsForm"

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
    })
    
    ChatManager.getAll()
        .then(allMessages => {
            this.setState({ messages: allMessages })
        })

    // GETTING all tasks for user:
    TaskManager.getAllTasks().then(allTasks => {
      this.setState({
          tasks: allTasks
      })
    })
  }

  

  deleteTask = (id) => {
    return TaskManager.removeAndList(id)
    .then(tasks => this.setState({
        tasks: tasks
      })
    )
  }

  deleteEvent = (id) => {
    return EventManager.removeAndList(id)
    .then(events => this.setState({
        events
      })
    )
  }

  addEvent = (event) => EventManager.post(event)
  .then(() => EventManager.getAll())
  .then(events => this.setState({
     events
    })
  )

  // ADDING A TASK:
   addTask = (task) => TaskManager.post(task)
   .then(() => TaskManager.getAllTasks())
   .then(tasks => this.setState({
      tasks: tasks
     })
   )

   addMessage = (message) => ChatManager.post(message)
    .then(() => ChatManager.getAll())
    .then(allMessages => this.setState({
        messages: allMessages
        })
    )

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
            return <ChatRoom {...props}
                    messages={this.state.messages}
                    addMessage={this.addMessage} />
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
          exact path="/events" render={props => {
            return <Events {...props}  events={this.state.events} deleteEvent={this.deleteEvent}/>
            // Remove null and return the component which will show the user's tasks
          }}
        />
          {/* Route for adding a new task */}
        <Route path="/tasks/new" render={(props) => {
                    return <TaskForm {...props}
                       addTask={this.addTask}
                       tasks={this.state.tasks} />
                   }} />

        <Route exact path="/events/new" render={(props) => {
                    return <EventsForm {...props}
                       addEvent={this.addEvent}
                       events={this.state.events} />
                   }} />

      </React.Fragment>
    );
  }
}
