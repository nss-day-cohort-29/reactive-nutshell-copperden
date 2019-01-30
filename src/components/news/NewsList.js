import React, { Component } from 'react'
// import { Link } from "react-router-dom"

export default class NewsList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="newsButton">
          <button type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/articles/new")
            }
            }>
            Add News article
    </button>
        </div>
        <section className="articles">
          {
            this.props.articles.map(article =>
              <div key={article.id} className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {article.title}<br></br>
                    {article.url}<br></br>
                    {article.synopsis}<br></br>
                    <a href="#"
                      onClick={() => this.props.deleteArticle(article.id)}
                      className="card-link">Delete</a>
                  </h5>
                </div>
              </div>
            )
          }
        </section>
      </React.Fragment>
    )
  }
}