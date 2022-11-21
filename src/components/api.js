import { currentUser } from "./global";
export const cohortId = "plus-cohort-16";
export const authorizationToken = "84065f1e-9b65-4660-bac5-9a220fdec6d4";
export const apiConfig = {
  url: `https://nomoreparties.co/v1/`,
  headers: {
    authorization: authorizationToken,
    "Content-Type": "application/json",
  },
};

class Api {
  constructor(baseUrl, cohortId, headers) {
    this._baseUrl = baseUrl;
    this._cohortId = cohortId;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}` + `${this._cohortId}` + "/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}` + `${this._cohortId}` + "/cards", {
      method: "GET",
      headers: apiConfig.headers,
    }).then(this._handleResponse);
  }

  patchProfile(name, about) {
    return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/users/me", {
      method: "PATCH",
      headers: apiConfig.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  postCard(name, link) {
    return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/cards", {
      method: "POST",
      headers: apiConfig.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }
  deleteCard(cardId) {
    return fetch(
      "https://nomoreparties.co/v1/" +
        `${cohortId}` +
        "/cards" +
        "/" +
        `${cardId}`,
      {
        method: "DELETE",
        headers: apiConfig.headers,
        body: JSON.stringify({
          _id: currentUser.id,
        }),
      }
    ).then(this._handleResponse);
  }

  postLikeToServer(cardId) {
    return fetch(
      "https://nomoreparties.co/v1/" +
        `${cohortId}` +
        "/cards" +
        "/likes/" +
        `${id}`,
      {
        method: "PUT",
        headers: apiConfig.headers,
      }
    ).then(this._handleResponse);
  }

  removeLikeFromServer(id) {
    return fetch(
      "https://nomoreparties.co/v1/" +
        `${cohortId}` +
        "/cards" +
        "/likes/" +
        `${id}`,
      {
        method: "DELETE",
        headers: apiConfig.headers,
      }
    ).then(this._handleResponse);
  }

  patchAvatar(avatarLink) {
    console.log(avatarLink);
    return fetch(
      "https://nomoreparties.co/v1/" + `${cohortId}` + "/users/me/avatar",
      {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({
          avatar: avatarLink,
        }),
      }
    ).then(this._handleResponse);
  }
}

export const api = new Api(apiConfig.url, cohortId, apiConfig.headers);
