export const cohortId = "plus-cohort-16";
export const authorizationToken = "84065f1e-9b65-4660-bac5-9a220fdec6d4";
export const apiConfig = {
  url: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: authorizationToken,
    "Content-Type": "application/json",
  },
};

export const getProfileInfo = () => {
  return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/users/me", {
    method: "GET",
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getCards = () => {
  return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/cards", {
    method: "GET",
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const patchProfile = (name, about) => {
  return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/users/me", {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const postCard = (name, link) => {
  return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/cards", {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
      _id: apiConfig.id,
    }),
  }).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

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
        _id: apiConfig.id,
      }),
    }
  ).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
        _id: apiConfig.id,
        likes: [likes.push("1")],
      }),
    }
  ).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
        _id: apiConfig.id,
        likes: [likes.pop()],
      }),
    }
  ).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
  ).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
  ).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
