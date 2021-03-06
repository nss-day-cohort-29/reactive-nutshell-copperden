import React, { Component } from "react"
import "./News.css"

export default class NewsForm extends Component {
  // Sets initial state
  state = {
    title: "",
    url: "",
    synopsis: ""
    // timestamp: "",
    // userId: ""
  }

  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  makeNewsArticle = e => {
    let sessionUser = sessionStorage.getItem("userId")
    let sessionUserNumber = Number(sessionUser)
    e.preventDefault()
    if (this.state.title === "") {
      window.alert("Please enter a title for your news article.");
    } else if (this.state.url === "") {
      window.alert("Please copy and paste the URL for your news article.") }
      else if (this.state.synopsis === "") {
        window.alert("Please include a brief synopsis about your news article."); }
        else {
    const article = {
      title: this.state.title,
      url: this.state.url,
      synopsis: this.state.synopsis,
      timestamp: Date.now(),
      userId: sessionUserNumber
    };
    // Creates the news article and redirects user to articles list
    this.props.addArticle(article).then(() => this.props.history.push("/"))
  }
}

  render() {
    return (
      <React.Fragment>
        <form className="newsForm" onSubmit={this.makeNewsArticle}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" required
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              placeholder="Title" />
          </div>
          <div className="form-group">
            <label htmlFor="url">Link</label>
            <input type="url" required
              className="form-control"
              onChange={this.handleFieldChange}
              id="url"
              placeholder="URL" />
          </div>
          <div className="form-group">
            <label htmlFor="synopsis">Synopsis</label>
            <textarea className="form-control" rows="3"
            onChange={this.handleFieldChange}
            id="synopsis"
            placeholder="Article summary" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </React.Fragment>
    )
  }
}