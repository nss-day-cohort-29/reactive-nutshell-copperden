const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/friends/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/friends`).then(e => e.json());
  }

}