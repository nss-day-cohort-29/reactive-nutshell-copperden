const remoteURL = "http://localhost:5002"

export default {
    getAllTasks() {
        return fetch(`${remoteURL}/tasks`).then(e => e.json())
      },
      removeAndList(id){
          return fetch(`http://localhost:5002/tasks/${id}`, {
              method: "DELETE"
          })
          .then(e => e.json())
          .then(() => fetch(`http://localhost:5002/tasks`))
          .then(e => e.json())
  }
    //   CHECK GITHUB FOR EDIT
}