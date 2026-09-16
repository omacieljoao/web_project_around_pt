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
    });
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      methos: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
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
