const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/events/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/events`).then(e => e.json());
  },
  post(newEvent) {
    return fetch(`${remoteURL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent)
    }).then(data => data.json());
  },
  removeAndList(id){
    return fetch(`http://localhost:5002/events/${id}`, {
        method: "DELETE"
    })
    .then(e => e.json())
    .then(() => fetch(`http://localhost:5002/events`))
    .then(e => e.json())
}
};