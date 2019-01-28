const remoteURL = "http://localhost:5002"

export default {

    get(id) {
        return fetch(`${remoteURL}/messages/${id}`).then(data => data.json())
    },

    getAll() {
        return fetch(`${remoteURL}/messages?_expand=user`).then(data => data.json())
    },

    post(newMessage) {
        return fetch(`${remoteURL}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newMessage)
        })
        .then(data => data.json())
      },

    put(messageId, editedMessage) {
        return fetch(`${remoteURL}/messages/${messageId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedMessage)
        })
      }
}