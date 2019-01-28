import React, { Component } from 'react'
// import dog from "./DogIcon.png"
// import "./Animal.css"
import { Link } from "react-router-dom";
// import AnimalCard from "./AnimalCard"

export default class TaskList extends Component {
    render () {
        return (
            <React.Fragment>

            {/* ADD TASK BUTTON */}
            <div className="taskButton">
            <button type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        this.props.history.push("/tasks/new")}
                    }>
                Add a task
            </button>
            </div>

                <h3>Your Tasks:</h3>
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
                               <a href="#"> <input type="checkbox" /></a>
                            </label>
                   {/* ADD LINK CHECK GITHUB */}

                </div>
            </div>
                )}
            </React.Fragment>
        )
    }
}