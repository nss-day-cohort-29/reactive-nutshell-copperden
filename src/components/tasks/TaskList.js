import React, { Component } from 'react'
// import dog from "./DogIcon.png"
import "./Task.css"
import { Link } from "react-router-dom";
// import AnimalCard from "./AnimalCard"

export default class TaskList extends Component {
    render () {
        return (
            <React.Fragment>

            {/* ADD TASK BUTTON */}
            <div className="taskButton">
            <button type="button"
                    className="btn btn-primary addTask"
                    onClick={() => {
                        this.props.history.push("/tasks/new")}
                    }>
                Add a task
            </button>
            </div>

                <h2>Your Tasks:</h2>
                <hr></hr>
                {
                    // GETTING ALL TASKS CURRENTLY IN JSON
                this.props.tasks.map(task =>
          <div key={task.id}>
                <div className="card-body">
                    <h5 className="card-title">
                        {task.taskName}<br></br>
                        {task.dueDate}
                    </h5>

                    {/* ADDING DELETE TO THE TASK PAGE */}
                            <label onClick={() => this.props.deleteTask(task.id)}
                    className="card-link">
                               {/* Complete <br></br> */}
                               <a href="#"> <input type="checkbox"/></a>
                            </label>
                   {/* ADD LINK FOR EDITCHECK GITHUB */}
                   <Link className="nav-link" to={`/tasks/${task.id}/edit`}>Edit</Link>

                </div>
                <hr></hr>
            </div>
                )}
            </React.Fragment>
        )
    }
}