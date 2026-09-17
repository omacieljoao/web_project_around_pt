export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => res.json());
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => res.json());
  }

  editProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => res.json());
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => res.json());
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => res.json());
  }

  changeLike(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this.baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this.headers,
      }).then((res) => res.json());
    } else {
      return fetch(`${this.baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this.headers,
      }).then((res) => res.json());
    }
  }

  changeProfilePicture() {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => res.json());
  }
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "5300bed1-0190-4c64-a95d-32ad375e02ee",
    "Content-Type": "application/json",
  },
});

fetch("https://around-api.pt-br.tripleten-services.com/v1/cards/", {
  headers: {
    authorization: "5300bed1-0190-4c64-a95d-32ad375e02ee",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
