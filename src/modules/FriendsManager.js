const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/friends/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/friends`).then(e => e.json());
  },
  getFriendsByCurrentUser(sessionId) {
  return fetch(`${remoteURL}/friends?currentUserId=${sessionId}&_expand=user`)
  .then(e => e.json());
  },
  getFriendship(currentUserId, userId) {
    return fetch(`${remoteURL}/friends?userId=${userId}&currentUserId=${currentUserId}`)
    .then(e => e.json());
  },
  post(newFriendship) {
    return fetch(`${remoteURL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFriendship)
    })
    .then(data => data.json())
  },

}