import "./styles.css";

import { validationConfig } from "../components/validation";

import {
  allPopups,
  userName,
  userJob,
  nameInput,
  jobInput,
  profileUpdaterPopup,
  openPopup,
  closePopup,
  profileUpdaterPopupOpenButton,
  profileUpdaterPopupCloseButton,
  profileUpdaterInputForm,
  picAdderOpenButton,
  picAdderCloseButton,
  pictureViewerCloseButton,
} from "../components/modal";

import {
  picAdderFormElement,
  addPicFormSubmitHandler,
  placeAdderPopup,
  pictureViewerPopup,
  renderCard,
} from "../components/card";
import { enableValidation } from "../components/validation";

///////////// API /////////////

export const cohortId = "plus-cohort-16";
export const authorizationToken = "84065f1e-9b65-4660-bac5-9a220fdec6d4";
export const apiConfig = {
  url: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: authorizationToken,
    "Content-Type": "application/json",
  },
};
const profileAvatar = document.querySelector(".profile__avatar");

// get profile info from server

function getProfileInfo() {
  fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/users/me", {
    method: "GET",
    headers: apiConfig.headers,
  })
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      updateProfileFromServer(data.name, data.about, data.avatar);
      apiConfig.id = data._id;
    })
    .catch((error) => console.log(error));
}

function updateProfileFromServer(dataName, dataAbout, dataAvatar) {
  userName.innerText = dataName;
  userJob.innerText = dataAbout;
  profileAvatar.src = dataAvatar;
}

getProfileInfo();

// get posts from server

export function getCards() {
  fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/cards", {
    method: "GET",
    headers: apiConfig.headers,
  })
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      // data.forEach((element) => console.log(element));
      data.reverse().forEach((cardinfo) => {
        renderCard(
          cardinfo.name,
          cardinfo.link,
          cardinfo.likes.length,
          cardinfo.owner._id,
          apiConfig.id,
          cardinfo._id
        );
      });
    })

    .catch((error) => console.log(error));
}

getCards();

// patch profile

function patchProfile(name, about) {
  fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/users/me", {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

// post card

export function postCard(name, link) {
  fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/cards", {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
      _id: apiConfig.id,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

// delete card

export function deleteCard(cardId) {
  fetch(
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
  )
    .then((response) => response.json())
    .then((json) => console.log(json));
}

// like card

// add like

export function addLike(cardId) {
  const postTemplate = document.querySelector("#post-template").content;
  const postElement = postTemplate.querySelector(".post").cloneNode(true);
  const likeButton = postElement.querySelector(".post__like-button");
  console.log("add like triggered");
  let likes = ["1"];
  fetch(
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
    .then((json) => console.log(json))
    .then(() => console.log("activate button"))
    .then(() => likeButton.classList.add(".post__like-button_active"));
}

//remove like

export function removeLike(cardId) {
  const postTemplate = document.querySelector("#post-template").content;
  const postElement = postTemplate.querySelector(".post").cloneNode(true);
  const likeButton = postElement.querySelector(".post__like-button");
  console.log("remove like triggered");
  let likes = ["1"];
  fetch(
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
    .then((json) => console.log(json))
    .then(() => likeButton.classList.remove(".post__like-button_active"));
}

// liked by current user

export function likedByCurrentUser(cardId) {
  fetch(
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
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // data.likes.forEach((element) => console.log(element._id));
      console.log("check if liked triggered");
      let found = false;
      for (let i = 0; i < data.likes.length; i++) {
        if (data.likes[i]._id == apiConfig.id) {
          found = true;
          console.log("found my like");
          console.log(found);
        }
      }
    });
}

console.log(likedByCurrentUser("63589ef97835d40b8101fa2f"));

// const array = [1, 2, 3, 4, 5];

// // checks whether an element is even
// const even = (element) => element % 2 === 0;

// console.log(array.some(even));
// expected output: true

// get carbyId
// get card likes (array of objects)
// cycle through like objects to find if there is a match by userId

///////////// end of API /////////////

enableValidation(validationConfig);

// popup update details

function updateProfile(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  patchProfile(nameInput.value, jobInput.value);
  closePopup(profileUpdaterPopup);
}

// viewing posts listeners

pictureViewerCloseButton.addEventListener("click", function handleClick(event) {
  closePopup(pictureViewerPopup);
});

// add pic form listeners

picAdderOpenButton.addEventListener("click", function handleClick(event) {
  openPopup(placeAdderPopup);
});

picAdderCloseButton.addEventListener("click", function handleClick(event) {
  closePopup(placeAdderPopup);
});

picAdderFormElement.addEventListener("submit", addPicFormSubmitHandler);

// profile edit listeners

profileUpdaterPopupOpenButton.addEventListener(
  "click",
  function handleClick(event) {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.innerText;
    openPopup(profileUpdaterPopup);
  }
);

profileUpdaterPopupCloseButton.addEventListener(
  "click",
  function handleClick(event) {
    closePopup(profileUpdaterPopup);
  }
);

profileUpdaterInputForm.addEventListener("submit", updateProfile);

// closing modals listeners

function addOverlayListener() {
  allPopups.forEach((popup) =>
    popup.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("popup")) {
        closePopup(popup);
      }
    })
  );
}

addOverlayListener();
