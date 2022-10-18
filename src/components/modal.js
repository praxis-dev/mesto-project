import { placeAdderPopup, pictureViewerPopup } from "../components/card";

const userName = document.querySelector("#profile__title");
const userJob = document.querySelector("#profile__subtitle");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-subtitle");
const profileUpdaterPopup = document.querySelector(".profile-edit-popup");
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

// popup open/close

function openPopup(popup) {
  popup.classList.add("popup_active");
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
}

// popup update details

function updateProfile(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(profileUpdaterPopup);
}

// popup close modals

function closeModals() {
  closePopup(pictureViewerPopup);
  closePopup(placeAdderPopup);
  closePopup(profileUpdaterPopup);
}

export {
  profileUpdaterPopupOpenButton,
  profileUpdaterPopupCloseButton,
  profileUpdaterInputForm,
  picAdderOpenButton,
  picAdderCloseButton,
  pictureViewerCloseButton,
  userName,
  userJob,
  nameInput,
  jobInput,
  profileUpdaterPopup,
  openPopup,
  closePopup,
  updateProfile,
  closeModals,
};
