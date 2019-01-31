import React, { Component } from 'react'
// import dog from "./DogIcon.png"
import "./Task.css"
import { Link } from "react-router-dom";
// import AnimalCard from "./AnimalCard"

export default class TaskList extends Component {
    render () {
        return (
            <section className="tasks">

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

                            {/* ADD LINK FOR EDITCHECK GITHUB */}
                             <Link className="nav-link" to={`/tasks/${task.id}/edit`}>Edit</Link>

                            {/* ADDING DELETE TO THE TASK PAGE */}
                            <div>
                                <button type="button"
                                className="btn btn-primary"
                                onClick={() => this.props.deleteTask(task.id)}>Delete</button>
                            </div>

                        </div>
                        <hr></hr>
                    </div>
                )}
            </section>
        )
    }
}