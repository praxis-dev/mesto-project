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
  });
};

export const getCards = () => {
  return fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/cards", {
    method: "GET",
    headers: apiConfig.headers,
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
  );
};

export const postLikeToServer = (cardId) => {
  console.log("add like triggered");
  let likes = ["1"];
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
        likes: [...likes, "1"],
      }),
    }
  )
    .then((response) => response.json())
    .then((json) => console.log(json));
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
  )
    .then((response) => response.json())
    .then((json) => console.log(json));
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
  );
};

export const getCardLikes = (cardId) => {
  return fetch(
    "https://nomoreparties.co/v1/" +
      `${cohortId}` +
      "/cards/" +
      "/likes/" +
      cardId,
    {
      method: "PUT",
      headers: apiConfig.headers,
    }
  );
};
