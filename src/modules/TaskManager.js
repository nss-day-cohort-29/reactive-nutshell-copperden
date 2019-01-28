const remoteURL = "http://localhost:5002"

export default {
    // getting all tasks:
    getAllTasks() {
        return fetch(`${remoteURL}/tasks`).then(e => e.json())
      },
    //   delete tasks
      removeAndList(id){
          return fetch(`http://localhost:5002/tasks/${id}`, {
              method: "DELETE"
          })
          .then(e => e.json())
          .then(() => fetch(`http://localhost:5002/tasks`))
          .then(e => e.json())
  },
//   adding a new task
  post(newTask) {
    return fetch(`${remoteURL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    }).then(data => data.json())
  }
    //   CHECK GITHUB FOR EDIT
}