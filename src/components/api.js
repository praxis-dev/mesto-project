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
    constructor(
        baseUrl,
        cohortId,
        endPoint,
        method,
        headers,
        name,
        about,
        currentUser,
        picName,
        picLink
    ) {
        this._baseUrl = baseUrl;
        this._cohortId = cohortId;
        this._endPoint = endPoint;
        this._method = method;
        this._headers = headers;
        this._name = name;
        this._about = about;
        this._currentUser = currentUser;
        this._picName = picName;
        this._picLink = picLink;
    }
    _handleResponse(res) {
        if (res.ok) {
            return res;
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    get() {
        return fetch(
            `${this._baseUrl}` + `${this._cohortId}` + `${this._endPoint}`,
            {
                method: this._method,
                headers: this._headers,
            }
        )
            .then(this._handleResponse)
    }

    patch() {
        return fetch(
            `${this._baseUrl}` + `${this._cohortId}` + `${this._endPoint}`,
            {
                method: this._method,
                headers: this._headers,
                body: JSON.stringify({
                    name: this._name,
                    about: this._about,
                }),
            }
        ).then(this._handleResponse)
    }

    post() {
        return fetch(`${this._baseUrl}` + `${cohortId}` + `${this._endPoint}`, {
            method: this._method,
            headers: this._headers,
            body: JSON.stringify({
                name: this._picName,
                link: this._picLink,
                _id: this._currentUser.id,
            }),
        }).then(this._handleResponse)
    }
}

export const getProfileInfo = () =>
    new Api(apiConfig.url, cohortId, "/users/me", "GET", apiConfig.headers).get();

export const getCards = () =>
    new Api(apiConfig.url, cohortId, "/cards", "GET", apiConfig.headers).get();

export const patchProfile = (currentUser, name, about) =>
    new Api(
        apiConfig.url,
        cohortId,
        "/users/me",
        "PATCH",
        apiConfig.headers,
        currentUser,
        name,
        about
    ).patch();

export const postCard = (picName, picLink) =>
    new Api(
        apiConfig.url,
        cohortId,
        "/cards",
        "POST",
        apiConfig.headers,
        currentUser,
        picName,
        picLink
    ).post();


// export const getProfileInfo = () => {
//   return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/users/me", {
//     method: "GET",
//     headers: apiConfig.headers,
//   }).then((res) => {
//     if (res.ok) {
//       return res;
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// };

// export const getCards = () => {
//   return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/cards", {
//     method: "GET",
//     headers: apiConfig.headers,
//   }).then((res) => {
//     if (res.ok) {
//       return res;
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// };

// export const patchProfile = (name, about) => {
//   return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/users/me", {
//     method: "PATCH",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       name: name,
//       about: about,
//     }),
//   }).then((res) => {
//     if (res.ok) {
//       return res;
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// };

// export const postCard = (name, link) => {
//   return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/cards", {
//     method: "POST",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       name: name,
//       link: link,
//       _id: currentUser.id,
//     }),
//   }).then((res) => {
//     if (res.ok) {
//       return res;
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// };

export const deleteCard = (cardId) => {
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
    ).then(this._handleResponse)
};

export const postLikeToServer = (cardId) => {
    let likes = [];
    return fetch(
        "https://nomoreparties.co/v1/" +
        `${cohortId}` +
        "/cards" +
        "/likes/" +
        `${cardId}`,
        {
            method: "PUT",
            headers: apiConfig.headers,
            body: JSON.stringify({
                _id: currentUser.id,
                likes: [likes.push("1")],
            }),
        }
    ).then(this._handleResponse)
};

export const removeLikeFromServer = (cardId) => {
    let likes = ["1"];
    return fetch(
        "https://nomoreparties.co/v1/" +
        `${cohortId}` +
        "/cards" +
        "/likes/" +
        `${cardId}`,
        {
            method: "DELETE",
            headers: apiConfig.headers,
            body: JSON.stringify({
                _id: currentUser.id,
                likes: [likes.pop()],
            }),
        }
    ).then(this._handleResponse)
};

export const patchAvatar = (avatarLink) => {
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
    ).then(this._handleResponse)
};

export const getCardLikes = (cardId) => {
    return fetch(
        "https://nomoreparties.co/v1/" +
        `${cohortId}` +
        "/cards/" +
        "/likes/" +
        `${cardId}`,
        {
            method: "PUT",
            headers: apiConfig.headers,
        }
    ).then(this._handleResponse)
};
