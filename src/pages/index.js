import "./styles.css";

import {
  userName,
  userJob,
  nameInput,
  jobInput,
  profileUpdaterPopup,
  openPopup,
  closePopup,
  updateProfile,
} from "../components/modal";

import {
  picAdderFormElement,
  addPicFormSubmitHandler,
  placeAdderPopup,
  pictureViewerPopup,
} from "../components/card";

const profileUpdaterPopupOpenButton =
  document.getElementById("profile__edit-icon");

const profileUpdaterPopupCloseButton = document.getElementById(
  "edit-window__close-button"
);

const profileUpdaterInputForm = document.querySelector(
  "#edit-window__input-form"
);

const picAdderOpenButton = document.getElementById("profile__add-button");
const picAdderCloseButton = document.getElementById(
  "add-pic-window__close-button"
);
const pictureViewerCloseButton = document.getElementById(
  "picture-viewer__close-button"
);

// viewing posts listents

pictureViewerCloseButton.addEventListener("click", function handleClick(event) {
  closePopup(pictureViewerPopup);
});

// add pic form listeners

picAdderOpenButton.addEventListener("click", function handleClick(event) {
  openPopup(placeAdderPopup);
});

picAdderCloseButton.addEventListener("click", function handleClick(event) {
  console.log("clickclick");
});

picAdderFormElement.addEventListener("submit", addPicFormSubmitHandler);

// profile edit listeners

profileUpdaterPopupOpenButton.addEventListener(
  "click",
  function handleClick(event) {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
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
