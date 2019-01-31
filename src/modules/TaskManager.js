const remoteURL = "http://localhost:5002"

export default {
    // "Put" for the edit
    put(taskId, existingTask){
      return fetch(`${remoteURL}/tasks/${taskId}`,{
        method:'PUT',
        headers:{
          "Content-Type": "application/JSON"
        },
        body:JSON.stringify(existingTask)

      })
    },
    // getting all tasks:
    getAllTasks() {
      let sessionUser = sessionStorage.getItem("userId")
      let sessionUserNumber = Number(sessionUser)
        return fetch(`${remoteURL}/tasks?userId=${sessionUserNumber}`)
        .then(e => e.json())
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
  },

  get(id){
    return fetch(`${remoteURL}/tasks/${id}`).then(res => res.json())
  }
}