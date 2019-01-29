const remoteURL = "http://localhost:5002"

export default {
  getAllArticles() {
    return fetch(`${remoteURL}/articles?_expand=user`).then(data => data.json())
  },

  post(newArticle) {
    return fetch(`${remoteURL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArticle)
    })
      .then(data => data.json())
  }
}