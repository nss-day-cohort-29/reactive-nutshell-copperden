const remoteURL = "http://localhost:5002"

export default {
  getAllArticles() {
    let sessionUser = sessionStorage.getItem("userId")
    let sessionUserNumber = Number(sessionUser)
      return fetch(`${remoteURL}/articles?userId=${sessionUserNumber}`)
      .then(e => e.json())
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
  },
   //   delete articles
   removeAndList(id){
    return fetch(`http://localhost:5002/articles/${id}`, {
        method: "DELETE"
    })
    .then(e => e.json())
    .then(() => fetch(`http://localhost:5002/articles`))
    .then(e => e.json())
}
}