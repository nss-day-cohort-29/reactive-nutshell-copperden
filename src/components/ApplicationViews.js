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
import EventEditForm from "./events/EventEditForm"
import TaskEditForm from './tasks/TaskEditForm'
import NewsManager from "../modules/NewsManager";
import NewsList from "./news/NewsList";
import NewsForm from "./news/NewsForm";
import Login from './authentication/Login'
import Register from './authentication/Register'
import SignUpManager from "../modules/SignUpManager";

export default class ApplicationViews extends Component {

  state = {
    users: [],
    articles: [],
    connections: [],
    messages: [],
    tasks: [],
    events: []
  };

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  componentDidMount() {

    NewsManager.getAllArticles()
      .then(allArticles => {
        this.setState({ articles: allArticles })
      })
    EventManager.getAll().then(allEvents => {
      this.setState({ events: allEvents });
    })

    ChatManager.getAll()
      .then(allMessages => {
        this.setState({ messages: allMessages })
      })

    // GETTING all tasks for user:
    TaskManager.getAllTasks()
      .then(allTasks => {
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

  updateEvent = (eventId, editedEventObj) => {
    return EventManager.put(eventId, editedEventObj)
      .then(() => EventManager.getAll())
      .then(events => {
        this.setState({
          events: events
        })
      });
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
          tasks: tasks
        })
      })
  }

  // POST new message
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

  addArticle = (article) => NewsManager.post(article)
    .then(() => NewsManager.getAllArticles())
    .then(articles => this.setState({
      articles: articles
    })
    )

  // ADDING A TASK:
  addTask = (task) => TaskManager.post(task)
    .then(() => TaskManager.getAllTasks())
    .then(tasks => this.setState({
      tasks: tasks
    })
    )
  // Edit existing message
  updateMessage = (messageId, editedMessage) => {
    return ChatManager.put(messageId, editedMessage)
      .then(() => ChatManager.getAll())
      .then(messages => {
        this.setState({
          messages: messages
        })
      })
  }

  addUser = (user) => SignUpManager.post(user)

  render() {
    return (
      <React.Fragment>

        <Route path="/login" component={Login} />

        <Route path="/register" render={(props) => {
          return <Register {...props}
            addUser={this.addUser} />
        }} />

        <Route
          exact path="/" render={(props) => {
            return <NewsList {...props} articles={this.state.articles} deleteArticle={this.deleteArticle} />
            // Remove null and return the component which will show news articles
          }}
        />
        {/* Route for adding a new article */}
        <Route path="/articles/new" render={(props) => {
          return <NewsForm {...props}
            addArticle={this.addArticle}
            articles={this.state.articles} />
        }} />

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
              addMessage={this.addMessage}
              updateMessage={this.updateMessage}
              users={this.state.users} />
          }}
        />

        <Route
          path="/tasks" render={props => {
            return <Route exact path="/tasks" render={(props) => {
              // LOGIN:
              if (this.isAuthenticated()) {
                return <TaskList {...props}
                  deleteTask={this.deleteTask}
                  tasks={this.state.tasks} />
              } else {
                return <Redirect to="/login" />
              }
            }} />
          }}
        />
        {/* Event Page */}
        <Route
          exact path="/events" render={props => {
            return <Events {...props} events={this.state.events} deleteEvent={this.deleteEvent} />
            // Remove null and return the component which will show the user's tasks
          }}
        />
        {/* Route for adding a new task */}
        <Route path="/tasks/new" render={(props) => {
          return <TaskForm {...props}

            tasks={this.state.tasks} />
        }} />
        {/* Route to add event form */}
        <Route exact path="/events/new" render={(props) => {
          return <EventsForm {...props}
            addEvent={this.addEvent}
            events={this.state.events} />
        }} />
        {/* Route to event edit page */}
        <Route
          path="/events/:eventsId(\d+)/edit" render={props => {
            return <EventEditForm {...props} updateEvent={this.updateEvent} />
          }}
        />
        {/* Route for edding a task */}
        <Route exact path='/tasks/:taskId(\d+)/edit' render={(props => {
          return <TaskEditForm {...props} updateTask={this.updateTask} />
        })} />

      </React.Fragment>
    );
  }
}

