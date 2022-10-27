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

import {
  cohortId,
  authorizationToken,
  apiConfig,
  getProfileInfo,
  getCards,
  patchProfile,
  checkIfLikedByMe,
  likedByCurrentUser,
} from "../components/api";

///////////// API /////////////

const profileAvatar = document.querySelector(".profile__avatar");

// get profile info from server

getProfileInfo()
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    updateProfileFromServer(data.name, data.about, data.avatar, data._id);
  })
  .catch((error) => console.log(error));
//

function updateProfileFromServer(dataName, dataAbout, dataAvatar, dataId) {
  userName.innerText = dataName;
  userJob.innerText = dataAbout;
  profileAvatar.src = dataAvatar;
  apiConfig.id = dataId;
}

getProfileInfo();

// get posts from server

getCards()
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((cardinfo) => console.log(likedByMe(cardinfo)));
    data.reverse().forEach((cardinfo) => {
      renderCard(
        cardinfo.name,
        cardinfo.link,
        cardinfo.likes.length,
        cardinfo.owner._id,
        apiConfig.id,
        cardinfo._id,
        likedByMe(cardinfo)
      );
    });
  })
  .catch((error) => console.log(error));
//

getCards();

function likedByMe(card) {
  return card.likes.some((like) => like._id === apiConfig.id);
}

///////////// end of API /////////////

enableValidation(validationConfig);

// popup update details

function updateProfile(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  patchProfile(nameInput.value, jobInput.value)
    .then((response) => response.json())
    .then((json) => console.log(json));
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
