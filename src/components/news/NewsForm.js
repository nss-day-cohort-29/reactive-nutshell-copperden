import React, { Component } from "react"
import ".News.css"

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
    const news = {
      title: this.state.title,
      url: this.state.url,
      synopsis: this.state.synopsis,
      timestamp: Date.now(),
      userId: 1
    }
    // Creates the news article and redirects user to articles list
    this.props.addNews(news).then(() => this.props.history.push("/articles"))
  }

  render() {
    return (
      <React.Fragment>
        <form className="newsForm">
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
              id="title"
              placeholder="Title" />
          </div>
          <div className="form-group">
            <label htmlFor="synopsis">Synopsis</label>
            <textarea className="form-control" rows="3"
            onChange={this.handleFieldChange}
            id="synopsis"
            placeholder="Article summary" />
          </div>
        </form>
      </React.Fragment>
    )
  }
}