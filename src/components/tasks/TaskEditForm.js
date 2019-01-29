import React, { Component } from 'react'
import TaskManager from '../../modules/TaskManager'

export default class TaskEditForm extends Component{
  state={
    taskName: "",
    dueDate: "",
    completed: ""
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}
  componentDidMount(){
    TaskManager.get(this.props.match.params.taskId).then(tasks => {
      this.setState({
        taskName:tasks.taskName,
        dueDate: tasks.dueDate,
        completed: tasks.completed
      })
    })
  }

  updateExistingTask = evt => {
      evt.preventDefault()

      const existingTask = {
        taskName:this.state.taskName ,
        dueDate: this.state.dueDate,
        completed:this.state.completed
      }
      this.props.updateTask(this.props.match.params.taskId, existingTask)
      .then(() => this.props.history.push("/tasks"))
    }

  render() {
    return (
        <React.Fragment>
            <form className="taskForm">
                <div className="form-group">
                    <label htmlFor="taskName">What do you need to do?</label>
                    <input type="text" required
                          className="form-control"
                          onChange={this.handleFieldChange}
                          id="taskName"
                          value={this.state.taskName}
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
                <button type="submit" onClick={this.updateExistingTask} className="btn btn-primary">Update</button>
            </form>
        </React.Fragment>
    )
}
}