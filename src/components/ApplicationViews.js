import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Events from "./events/Events"
import TaskList from "./tasks/TaskList"
import TaskManager from "../modules/TaskManager"
import TaskForm from "./tasks/TaskForm"
import ChatRoom from "./chatroom/ChatRoom"
import ChatManager from "../modules/ChatManager"
import TaskEditForm from './tasks/TaskEditForm'
import NewsManager from "../modules/NewsManager";
import NewsList from "./news/NewsList";

export default class ApplicationViews extends Component {

  state = {
    articles: [],
    connections: [],
    messages: [],
    tasks: [],
    events: []
  };

  componentDidMount() {

    NewsManager.getAllArticles().then(allArticles => {
      this.setState({ articles: allArticles})
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

  // ADDING A TASK:
   addTask = (task) => TaskManager.post(task)
   .then(() => TaskManager.getAllTasks())
   .then(tasks => this.setState({
      tasks: tasks
     })
   )

  //  EDIT A TASK:
  updateTask = (taskId, editedTaskObj) => {
    return TaskManager.put(taskId, editedTaskObj)
    .then(() => TaskManager.getAllTasks())
    .then(tasks => {
      this.setState({
        tasks:tasks
      })
    })
  }

   addMessage = (message) => ChatManager.post(message)
    .then(() => ChatManager.getAll())
    .then(allMessages => this.setState({
        messages: allMessages
        })
    )

    deleteArticle = (id) => {
      return NewsManager.removeAndList(id)
      .then(articles => this.setState({
          articles: articles
        })
      )
    }

    // ADDING A TASK:
     addTask = (task) => TaskManager.post(task)
     .then(() => TaskManager.getAllTasks())
     .then(tasks => this.setState({
        tasks: tasks
       })
     )

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <NewsList articles={this.state.articles} />
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
          path="/events" render={props => {
            return <Events />
            // Remove null and return the component which will show the user's tasks
          }}
        />
          {/* Route for adding a new task */}
        <Route path="/tasks/new" render={(props) => {
                    return <TaskForm {...props}
                       addTask={this.addTask}
                       tasks={this.state.tasks} />
                   }} />

          {/* Route for edding a task */}
          <Route exact path='/tasks/:taskId(\d+)/edit' render={(props => {
            return <TaskEditForm {...props} updateTask = {this.updateTask}/>
          })} />

      </React.Fragment>
    );
  }
}
