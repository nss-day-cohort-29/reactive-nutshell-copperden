import React, { Component } from "react"
import EventManager from "../../modules/EventManager"

export default class StudentForm extends Component {
    // Set initial state
    state = {
      firstName: "",
      lastName: "",
      notes: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingStudent = evt => {
      evt.preventDefault()

      const existingStudent = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        notes: this.state.notes
      }

    this.props.updateStudent(this.props.match.params.studentId, existingStudent)
    .then(() => this.props.history.push("/students"))      
    }

    componentDidMount() {
      StudentManager.get(this.props.match.params.studentId)
      .then(student => {
        this.setState({
          firstName: student.firstName,
          lastName: student.lastName,
          notes: student.notes
        });
      });
    }


    render() {
        return (
            <React.Fragment>
                <form className="studentForm">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" required
                          className="form-control"
                          onChange={this.handleFieldChange}
                          id="firstName" 
                          value = {this.state.firstName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" required
                          className="form-control"
                          onChange={this.handleFieldChange}
                          id="lastName" 
                          value={this.state.lastName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <input type="text" required
                          className="form-control"
                          onChange={this.handleFieldChange}
                          id="notes" 
                          value={this.state.notes} />
                    </div>
                    
                    <button type="submit" onClick={this.updateExistingStudent} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}

